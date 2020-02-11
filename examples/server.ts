import fs from 'fs';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import express from 'express';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import requireFromString from 'require-from-string';
import fetch from 'node-fetch';

const { PORT, DIR, EXT = 'ts' } = process.env;

const publicPath = '/';
const template = `./examples/${DIR}/public/index.html`;

const compiler = webpack({
  mode: 'development',
  entry: {
    main: `./examples/${DIR}/src/index.${EXT}`,
    ssr: `./examples/${DIR}/src/ssr.${EXT}`,
  },
  output: {
    publicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template,
      excludeChunks: ['ssr'],
    }),
  ],
  module: {
    rules: [{
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    }],
  },
  stats: {
    warningsFilter: /export '.*' was not found in/,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-suspense-router': `${__dirname}/../src`,
    },
  },
});

const instance = middleware(compiler, {
  publicPath,
  serverSideRender: true,
});

const app = express();

app.use(instance);

app.use(async (req, res) => {
  const {
    assetsByChunkName,
    outputPath,
  } = res.locals.webpackStats.toJson();
  const memFs = res.locals.fs;

  const jsAssets = `<script type="text/javascript" src="${publicPath}${assetsByChunkName.main}"></script>`;

  const userAgent = 'react-suspense-router (ServerSideRendering)';
  const windowMock = { navigator: { userAgent }, cacheForSsr: {} };
  const documentMock = {
    createElement() {
      return {};
    },
    head: {
      appendChild(ele: { src: string; onload: () => void }) {
        const chunkCode = memFs.readFileSync(`${outputPath}/${ele.src}`, 'utf8');
        const loadChunk = requireFromString(`module.exports=function(window,document,fetch){${chunkCode}}`);
        loadChunk(windowMock, documentMock, fetch);
        ele.onload();
      },
    },
  };

  const ssrCode = memFs.readFileSync(`${outputPath}/${assetsByChunkName.ssr}`, 'utf8');
  // fs.writeFileSync('./ssrcode.js', ssrCode, 'utf8');
  // const ssrCode = fs.readFileSync('./ssrcode.js', 'utf8');
  const ssrFactory = requireFromString(`module.exports=function(window,document,fetch){return ${ssrCode}}`);
  const ssr = ssrFactory(windowMock, documentMock, fetch).default;

  const renderLoop = async (repeat: number): Promise<string> => {
    if (repeat >= 10) return '';
    try {
      return ssr(req.url);
    } catch (e) {
      if (e.message === 'ReactDOMServer does not yet support lazy-loaded components.') {
        // HACK until renderToString support lazy and suspense
        await new Promise((r) => setTimeout(r, 500 * repeat));
        return renderLoop(repeat + 1);
      }
      throw e;
    }
  };
  const appHtml = await renderLoop(0);

  // clear cacheForSsr
  Object.keys(windowMock.cacheForSsr).forEach((key) => {
    delete windowMock.cacheForSsr[key as keyof typeof windowMock.cacheForSsr];
  });

  let body = fs.readFileSync(template, 'utf8');
  body = body.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
  body = body.replace('</body>', `${jsAssets}</body>`);

  res.send(body);
});

app.use(express.static(`./examples/${DIR}/public`));

app.listen(PORT || 8080, () => {
  console.log(`Example app listening on port ${PORT || 8080}!`);
});
