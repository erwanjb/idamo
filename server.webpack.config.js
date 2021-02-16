const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/index.ts',
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?100'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'server.tsconfig.json'
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist-server'),
    },
    plugins: [
        new Dotenv(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: 'server.tsconfig.json' })
        ]
    }
};