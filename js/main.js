var game =
{
	map: null,
	rules: null,
	config: null,
	sim: null,
	doFrameUpdate: false,
	frameCounter: -1,
	oddFrame: false,
	frameBitTwo: false,
	simPaused: true,
	init: function()
	{
		data.init();
		this.config = new Config();
		this.rules = rules.base;
		ui.init();
		if(!canvas.init())
			return;
		ui.update();
		this.map = new Map(128, 128, {});
		this.sim = new Simulation();
		this.load("save");
		ui.resize();
		this.sim.updateUI();
		this.frameRefresh();
		this.simPaused = false;
		this.simUpdate();
	},
	simUpdate: function()
	{
		if(!game.simPaused)
		{
			game.sim.update();
			game.map.doPowerGrid();
			game.map.doZones();
			game.sim.updateUI();
		}
		setTimeout(game.simUpdate, game.config.simUpdateDelay);
	},
	redrawEverything: function()
	{
		this.map.draw();
	},
	frameRefresh: function()
	{
		if(game.frameRefresh)
		{
			if(game.frameCounter++ > 1023)
				game.frameCounter = 0;
			game.oddFrame = (game.frameCounter & 1) > 0;
			game.frameBitTwo = (game.frameCounter & 0x2) > 0;
			game.redrawEverything();
		}
		setTimeout(game.frameRefresh, game.config.frameUpdateDelay);
	},
	save: function()
	{
		if(!window.localStorage)
		{
			dialog.messageBox.show("Error", "Your browser does not appear to support HTML5 Local Storage. You will be unable to save your game.");
			return;
		}
		var save = {
			version: data.saveStateVersionNumber,
			sim: this.sim.getSaveState(),
			map: this.map.getSaveState(),
			rules: this.rules.name
		};
		save = JSON.stringify(save);
		
		try
		{
			window.localStorage.setItem("save", save);
			if(save != window.localStorage.getItem("save"))
				throw new Error();
		}
		catch(e)
		{
			if(e == QUOTA_EXCEEDED_ERR)
			{
				dialog.messageBox.show("Error", "Your game could not be saved because you have too many games stored. Please try removing one.");
				return;
			}
			else
			{
				dialog.messageBox.show("Error", "Your game could not be saved.");
				return;
			}
		}
		dialog.messageBox.show("Game Saved", "Your game was saved.");
	},
	load: function(name)
	{
		if(!window.localStorage)
		{
			dialog.messageBox.show("Error", "Your browser does not appear to support HTML5 Local Storage. You will be unable to save your game.");
			return false;
		}
		
		this.doFrameUpdate = false;
		//try
		{
			var save = window.localStorage.getItem(name);
			if(!save)
				return false;
			save = JSON.parse(save);
			if(save.version != data.saveStateVersionNumber)
			{
				dialog.messageBox.show("Error", "This saved game is for a different version of the game and is not compatible.");
				return false;
			}
			this.rules = rules[save.rules];
			this.sim.loadSaveState(save.sim);
			this.map.loadSaveState(save.map);
		}
		//catch(e)
		{
		//	dialog.messageBox.show("Error", "Your game could not be loaded.");
		//	return false;
		}
		//finally
		{
			this.doFrameUpdate = true;
		}
		
		return true;
	}
}

$(window).load(function(){game.init();});
