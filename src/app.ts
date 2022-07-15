import * as express from 'express';
import * as bodyParser from 'body-parser';
import { myDataSource } from "./app-data-source"
import AppRoutes from './routes/index';

class App {
	public app: express.Application;
	public port: number;
	appRoutes = new AppRoutes();

	constructor(port: number) {
		this.app = express();
		this.port = port;

		this.initializeMiddlewares();
		this.initializeRouters(this.appRoutes.routers);
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded());
	}

	private initializeRouters(router) {
		router.forEach(routes => {
			this.app.use('/', routes);
		})
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`)
		})
	}

	public connectToTheDatabase() {
		myDataSource
			.initialize()
			.then(() => {
				console.log("Data Source has been initialized!")
			})
			.catch((err) => {
				console.error("Error during Data Source initialization:", err)
			})
	}
}

export default App;
