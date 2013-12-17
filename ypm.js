var fis = module.exports = require('fis');

fis.cli.name = "ypm";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    roadmap: {
        path: [
            {
                //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg: /^\/modules\/([^\/]+)\/\1\.(js|coffee|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod: true,
                //less和css文件会做csssprite处理
                useSprite: true,
                //id为文件夹名
                id: '$1'
            },
            {
                //modules目录下的其他文件
                reg: /^\/modules\/(.*)\.(js|coffee|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod: true,
                //less和css文件会做csssprite处理
                useSprite: true,
                //id是去掉modules和.js后缀中间的部分
                id: '$1'
            },
            {
                //.mixin.less后缀的文件
                reg: /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release: false
            },
            {
                //其他js、css、coffee、less文件
                reg: /\.(js|coffee|less)$/,
                //less和css文件会做csssprite处理
                useSprite: true,
                //不要放到js资源表里
                useMap: false
            },
			 {
                //其他js、css、coffee、less文件
                reg: /\.css$/,
                //less和css文件会做csssprite处理
                useSprite: true,
                //不要放到js资源表里
                useMap: true
            },
            {
                //readme文件，不要发布
                reg: /\/readme.md$/i,
                release: false
            },
            {
                //前端模板
                reg: '**.tmpl',
                //当做类html文件处理，可以识别<img src="xxx"/>等资源定位标识
                isJsLike:true
            }
        ],
        ext: {
            //less输出为css文件
            less: 'css',
            //coffee输出为js文件
            coffee: 'js'
        }
    },
    modules: {//fis插件配置
        parser: {
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl: 'utc',
            //.coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee: 'coffee-script',
            //.less后缀的文件使用fis-parser-less插件编译
            less: 'less'
        },
        optimizer: {
            js: 'uglify-js',
            css: 'clean-css',
            png: 'png-compressor',
            html: 'html-compress'
        },
        lint: {
            js: 'jshint'
        },
		 postprocessor : {
            js : 'ypm, require-async'
        },
        postpackager : 'ypm'
    },
    settings: {
        parser: {
            'coffee-script': {
                //不用coffee-script包装作用域
                bare: true
            }
        },
        lint: {
            jshint: {
                //排除对lib和jquery、backbone、underscore的检查
                ignored: [ 'lib/**', /jquery|underscore/i ],
                //使用中文报错
                i18n: 'zh-CN'
            }
        },
        postprocessor : {
            ypm : {
                type : 'amd'
            }
        },
        postpackager: {
            modjs: {
                subpath: 'pkg/map.js'
            }
        }
    }
});