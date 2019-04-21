import path from 'path';

import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import bodyParser from 'body-parser';
import TodoRoutes from './todo-routes';
import mongoose from "mongoose"

const APP_PORT = 3001;

const compiler = webpack({
	mode: 'development',
	entry: ['whatwg-fetch', path.resolve(__dirname, '../frontend', 'app.js')],
	devtool: "#source-map", //inline-source-map
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	output: {
		filename: 'app.js',
		path: '/',
	},
});

const app = new WebpackDevServer(compiler, {
	contentBase: '/public/',
	publicPath: '/frontend/',
	stats: {colors: true},
});

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/simple-todo", { useNewUrlParser: true })
}

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(TodoRoutes);

app.listen(APP_PORT, () => { console.log(`App is now running on http://localhost:${APP_PORT}`); });
