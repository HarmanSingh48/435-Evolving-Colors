const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	let automata = new Automata(gameEngine);
	gameEngine.addEntity(automata);
	document.getElementById("plant").addEventListener("click", () => {
		automata.addPlant();
	});
	document.getElementById("animat").addEventListener("click", () => {
		automata.addAnimat();
	});
	document.getElementById("clear").addEventListener("click", () => {
		automata.clearAll();
	});

	gameEngine.start();
});
