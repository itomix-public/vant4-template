import vue from '@vitejs/plugin-vue';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { defineConfig } from 'vite';

var path = require('path');

export default({ command, mode }) => {
  let isProd = (command === 'serve'); // 情景配置是否为开发模式 serve 或 build
  return defineConfig({
    // root: '',
    base: isProd ? '/' : '/shzl/', // 开发或生产环境服务的公共基础路径。
    // mode: '', // 在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
    // define: '', // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    plugins: [ // 将要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。查看 插件 API 获取 Vite 插件的更多细节。
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    // publicDir: '', // 作为静态资源服务的文件夹。这个目录中的文件会在开发中被服务于 /，在开发模式时，会被拷贝到 outDir 的根目录，并没有转换，永远只是复制到这里。该值可以是文件系统的绝对路径，也可以是相对于项目的根目录路径。
    // cacheDir: '', // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite 生成的某些缓存文件，使用缓存可以提高性能。如需重新生成缓存文件，你可以使用 --force 命令行选项或手动删除目录。此选项的值可以是文件的绝对路径，也可以是以项目根目录为基准的相对路径。
    resolve: {
      alias: { // 将会被传递到 @rollup/plugin-alias 作为 entries 的选项。也可以是一个对象，或一个 { find, replacement } 的数组. 当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会被原封不动地使用，因此无法被正常解析。 更高级的自定义解析方法可以通过 插件 实现。
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@images": path.resolve(__dirname, "src/assets/images"),
        "common": path.resolve(__dirname, "src/common"),
      },
      // dedupe: [''], // 如果你在你的应用程序中有相同依赖的副本（比如 monorepos），使用这个选项来强制 Vite 总是将列出的依赖关系解析到相同的副本（从项目根目录)。
      // conditions: [''], // 在解析包的 情景导出 时允许的附加条件。
      // mainFields: [''], // package.json 中，在解析包的入口点时尝试的字段列表。注意，这比从 exports 字段解析的情景导出优先级低：如果一个入口点从 exports 成功解析，主字段将被忽略。
      // extensions: [''], // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    },
    // css: {
      // modules: '', // 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
      // postcss: '', // 内联的 PostCSS 配置（格式同 postcss.config.js），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径。其路径搜索是通过 postcss-load-config 实现的。 注意，如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源。
      // preprocessorOptions: '', // 指定传递给 CSS 预处理器的选项。
    // },
    // json: {
    //   namedExports: true, // 是否支持从 .json 文件中进行按名导入。
    //   stringify: false, // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。 开启此项，则会禁用按名导入。
    // },
    // esbuild: false, // 
    // assetsInclude: '', // 指定其他文件类型作为静态资源处理
    logLevel: 'info', // 调整控制台输出的级别，默认为 'info'。
    // clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下请通过 --clearScreen false 设置。
    server: {
      host: '0.0.0.0',
      port: 8006, // 本地服务端口
      // strictPort: true, // 设为true时若端口已被占用则会直接退出, 而不是尝试下一个可用端口
      // https: '',
      // open: false, // 在服务器启动时自动在浏览器中打开应用程序. 当此值为字符串时, 会被当作URL的路径名.
      proxy: { // 代理
        '/srv/': {
          target: 'http://space-dev.onwall.cn',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
      // cors: '', // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
      // force: '', // 设置为 true 强制使依赖预构建。
      // hmr: '', // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层。
      // watch: '', // 传递给 chokidar 的文件系统监视器选项。
    },
    build: {
      outDir: 'shzl', // 指定输出路径(相对于项目根目录).
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
        input: { // 多页面应用模式
          main: path.resolve(__dirname, 'index.html'),
          // shzl2022: path.resolve(__dirname, 'shzl2022.html'), // router需要配置入口
        }
      },
    },
    optimizeDeps: {
      // entries: '',
      // exclude: [],
      include: ['jquery', 'lodash', 'moment', 'axios', 'pinia', 'vue-router', 'vant'], // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
      // keepNames: false, // 打包器有时需要重命名符号以避免冲突。 设置此项为 true 可以在函数和类上保留 name 属性。 若想获取更多详情，请参阅 keepNames
    }
  });
};
