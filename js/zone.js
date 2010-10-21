function Zone(type, left, top, right, bottom)
{
	this.zoneInfo = data.zoneInfo[type];
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.tiles = [];
}
Zone.prototype =
{
	// Set all of the graphic tiles of a zone
	setTiles: function()
	{
		// TODO Handle population and land value parameters
		var ix, iy, tileOfs = 0;
		for(iy = this.top; iy < this.bottom; ++iy)
		{
			for(ix = this.left; ix < this.right; ++ix)
			{
				game.map.getTile(ix, iy)
					.setTile(this.zoneInfo.baseTile + (tileOfs++));
			}
		}
	},
	// Resets all of the tiles along the edges of the zone
	resetEdges: function()
	{
		// Walk the edges and reset tiles
		var ix, iy, tile;
		for(ix = this.left - 1; ix <= this.right; ++ix)
		{
			tile = game.map.getTile(ix, this.top - 1);
			if(tile)
				tile.resetAllTiles();
			tile = game.map.getTile(ix, this.bottom);
			if(tile)
				tile.resetAllTiles();
		}
		for(iy = this.top; iy < this.bottom; ++iy)
		{
			tile = game.map.getTile(this.left - 1, iy);
			if(tile)
				tile.resetAllTiles();
			tile = game.map.getTile(this.right, iy);
			if(tile)
				tile.resetAllTiles();
		}
	},
	// Redraw the entire zone and it's edges
	redraw: function()
	{
		game.map.drawRect(this.left - 1, this.top - 1,
			(this.right - this.left) + 2, (this.bottom - this.top) + 2);
	},
	// Bulldoze a zone and return the cost
	bulldoze: function(pretend)
	{
		var cost = this.zoneInfo.width * this.zoneInfo.height *
			game.rules.cost.bulldozeZone;
		
		if(!pretend)
		{
			var ix, iy;
			for(iy = this.top; iy < this.bottom; ++iy)
			{
				for(ix = this.left; ix < this.right; ++ix)
				{
					var tile = game.map.getTile(ix, iy);
					tile.makeRubble();
					tile.setZone(null);
				}
			}
			this.redraw();
			game.map.removeZone(this);
		}
		
		return cost;
	},
	// Return the saved state representation of this zone
	getSaveState: function()
	{
		// Once again we are trying to squeeze a lot of data into a small
		// package, and we are doing so with base 36 encoding of binary data.
		// Note that no RLE-compression is attempted as every zone will have
		// some data different, at the very least the positions.
		var ret = this.zoneInfo.zoneIndex & 0xf;
		ret |= (this.left & 0xff) << 4;
		ret |= (this.top & 0xff) << 12;
		return ret.toString(36);
	},
	// Load values from a saved state representation
	loadSaveState: function(state)
	{
		state = parseInt(state, 36);
		this.zoneInfo = data.zoneInfo.crossRef[state & 0xf];
		this.left = (state & 0xff0) >> 4;
		this.top = (state & 0xff000) >> 12;
		this.right = this.left + this.zoneInfo.width;
		this.bottom = this.top + this.zoneInfo.height;
		var ix, iy;
		for(iy = this.top; iy < this.bottom; ++iy)
		{
			for(ix = this.left; ix < this.right; ++ix)
			{
				game.map.getTile(ix, iy).setZone(this);
			}
		}
	}
};