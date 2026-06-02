import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//import ReactRefreshTypeScript from "react-refresh-typescript";
import {BuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const cssLoader = {
            test: /\.css$/, 
            include: /node_modules/,
            use: ["style-loader",
            {
                loader: 'css-loader',
                
                // options: {
                //   modules: {
                //     namedExport: false,
                //     localIdentName: '[name]_[local]-[hash:base64:5]',
                //   },
                // },
              },
            ],
        
    }
    const cssLoaderWithModules = {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ["style-loader",
      {
          loader: 'css-loader',
          
          options: {
            modules: {
              namedExport: false,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            },
          },
        },
      ],  
}

    const scssLoader = {
        test: /\.s[ac]ss$/i,///\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      }
     



    // const tsLoader = {
    //     // ts-loader умеет работать с JSX
    //     // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
    //     exclude: /node_modules/,
    //     test: /\.tsx?$/,
    //     use: [
    //         {
    //             loader: 'ts-loader',
    //             options: {
    //                 transpileOnly: true,
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //                 }),
    //             }
    //         }
    //     ]
    // }

    const babelLoader = buildBabelLoader(options);


    return [
        assetLoader,
        cssLoader,
        cssLoaderWithModules,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgrLoader
    ]
}