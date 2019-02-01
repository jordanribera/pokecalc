PokeCalc = {

	'Init': function()
	{
	
		PokeCalc.UI.Init();
	
	},
	
	'SelectedTypes': [-1,-1],
	
	'SelectType': function(SelectingType, Event)
	{
	
		//alert(Event.srcElement.innerHTML);
		
		SelectingType = Event.srcElement.innerHTML
	
		if(SelectingType == '')
		{
			SelectingTypeNum = -1;
		}
		else
		{
			SelectingTypeNum = TypeChart.GetTypeNumber(SelectingType);
		}
	
		if(Event.button == 2)
		{
		
			PokeCalc.SelectedTypes[1] = SelectingTypeNum;
		
		}
		else
		{
		
			PokeCalc.SelectedTypes[0] = SelectingTypeNum;
		
		}
		
		//alert(PokeCalc.SelectedTypes[0] + ' ' + PokeCalc.SelectedTypes[1]);
		
		PokeCalc.UI.RefreshSelection();
	
	},

	'UI':
	{
	
		'Init': function()
		{
		
			TypeChartContainer = document.createElement('div');
			TypeChartContainer.setAttribute('id', 'TypeChartContainer');
			
			HeaderRow = document.createElement('div');
			HeaderRow.setAttribute('class', 'TypeChartRow');
			
			HeaderX = document.createElement('div');
			HeaderX.setAttribute('class', 'TypeChartCell TypeLabel');
			HeaderX.onmousedown = function(e) { PokeCalc.SelectType('none', e) };
			HeaderX.oncontextmenu = function(){ return false; };

			HeaderRow.appendChild(HeaderX);
			
			for (HeaderType in TypeChart.Types)
			{
			
				HeaderCell = document.createElement('div');
				HeaderCell.setAttribute('class', 'TypeChartCell TypeLabel ' + TypeChart.Types[HeaderType].Type);
				
				HeaderCell.innerHTML = TypeChart.Types[HeaderType].Type;
				
				HeaderCell.onmousedown = function(e) { PokeCalc.SelectType(TypeChart.Types[HeaderType].Type, e) };
				//HeaderCell.setAttribute('onmousedown', 'PokeCalc.SelectType(\'' + TypeChart.Types[HeaderType].Type + '\', e)');
				HeaderCell.oncontextmenu = function(){ return false; };
				
				HeaderRow.appendChild(HeaderCell);
			
			}
			
			TypeChartContainer.appendChild(HeaderRow);
			
			for (AttackingType in TypeChart.Types)
			{
			
				AttackingTypeRow = document.createElement('div');
				AttackingTypeRow.setAttribute('class', 'TypeChartRow');
				
				AttackingLabel = document.createElement('div');
				AttackingLabel.setAttribute('class', 'TypeChartCell TypeLabel ' + TypeChart.Types[AttackingType].Type);
				AttackingLabel.innerHTML = TypeChart.Types[AttackingType].Type;
				AttackingLabel.onmousedown = function(e) { PokeCalc.SelectType(TypeChart.Types[HeaderType].Type, e) };
				AttackingLabel.oncontextmenu = function(){ return false; };
				
				AttackingTypeRow.appendChild(AttackingLabel);
				
				for (DefendingType in TypeChart.Types)
				{
				
					Resist = TypeChart.Types[DefendingType].Resists[AttackingType];
					
					ResistClass = 'full';
					if (Resist == 0) ResistClass = 'immune';
					if (Resist == 2) ResistClass = 'double';
					if (Resist == .5) ResistClass = 'half';
					
					
					ResistCell = document.createElement('div');
					ResistCell.setAttribute('class', 'TypeChartCell ' + ResistClass);
					ResistCell.innerHTML = Resist;
					
					AttackingTypeRow.appendChild(ResistCell);
				
				}
				
				TypeChartContainer.appendChild(AttackingTypeRow);
			
			}
			
			document.body.appendChild(TypeChartContainer);
			
			//Selection
			TypeSelectionContainer = document.createElement('div');
			TypeSelectionContainer.setAttribute('id', 'TypeSelectionContainer');
			document.body.appendChild(TypeSelectionContainer);
			
			PokeCalc.UI.RefreshSelection();
			
		
		
		},
		
		'ClearElement': function(ClearingElement)
		{
		
			
		
		},
		
		'RefreshSelection': function()
		{
		
			TypeSelectionContainer = document.getElementById('TypeSelectionContainer');
			
			TypeSelectionContainer.innerHTML = '';
			
			HeaderRow = document.createElement('div');
			HeaderRow.setAttribute('class', 'TypeChartRow');
			
			for(ThisType in PokeCalc.SelectedTypes)
			{
			
				ThisTypeHeader = document.createElement('div');
			
				if(PokeCalc.SelectedTypes[ThisType] == -1)
				{
				
					ThisTypeHeader.setAttribute('class', 'TypeChartCell');
					
					if(ThisType == 0) ThisTypeHeader.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24" viewBox="0 0 83.291 82.353" enable-background="new 0 0 83.291 82.353" xml:space="preserve"><path fill="white" d="M39.764,28.393c0-1.771,1.129-3.276,2.706-3.844V6.437c-10.172,0.71-18.203,9.185-18.203,19.537v6.657h15.497V28.393z"/><path fill="silver" d="M47.941,28.393v4.238h15.497v-6.657c0-10.352-8.032-18.827-18.201-19.537v18.112C46.812,25.116,47.941,26.621,47.941,28.393  z"/><path fill="silver" d="M47.914,35.396h-8.122H24.267v21.902c0,10.816,8.769,19.584,19.585,19.584c10.816,0,19.586-8.768,19.586-19.584V35.396  H47.914z"/></svg>';
					if(ThisType == 1) ThisTypeHeader.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="24" height="24" viewBox="0 0 83.291 82.353" enable-background="new 0 0 83.291 82.353" xml:space="preserve"><path fill="silver" d="M39.764,28.393c0-1.771,1.129-3.276,2.706-3.844V6.437c-10.172,0.71-18.203,9.185-18.203,19.537v6.657h15.497V28.393z"/><path fill="white" d="M47.941,28.393v4.238h15.497v-6.657c0-10.352-8.032-18.827-18.201-19.537v18.112C46.812,25.116,47.941,26.621,47.941,28.393  z"/><path fill="silver" d="M47.914,35.396h-8.122H24.267v21.902c0,10.816,8.769,19.584,19.585,19.584c10.816,0,19.586-8.768,19.586-19.584V35.396  H47.914z"/></svg>';
				
				}
				else
				{
				
					ThisTypeHeader.setAttribute('class', 'TypeChartCell ' + TypeChart.Types[PokeCalc.SelectedTypes[ThisType]].Type);
					ThisTypeHeader.innerHTML = TypeChart.Types[PokeCalc.SelectedTypes[ThisType]].Type;
				
				}
				
				HeaderRow.appendChild(ThisTypeHeader);
			
			}
			
			ComparisonHeader = document.createElement('div');
			ComparisonHeader.setAttribute('class', 'TypeChartCell');
			HeaderRow.appendChild(ComparisonHeader);
			
			TypeSelectionContainer.appendChild(HeaderRow);
			
			for(ThisAttackingType in TypeChart.Types)
			{
			
				
			
				TypeComparisonRow = document.createElement('div');
				TypeComparisonRow.setAttribute('class', 'TypeChartRow');
				
				
				TypeCell1 = document.createElement('div');
				TypeCell2 = document.createElement('div');
				TypeCell3 = document.createElement('div');
				
				TypeCell1.setAttribute('class', 'TypeChartCell');
				if(PokeCalc.SelectedTypes[0] != -1)
				{
				
					Resist = TypeChart.Types[PokeCalc.SelectedTypes[0]].Resists[ThisAttackingType];
					ResistClass = 'full';
					if(Resist == 2) ResistClass = 'double';
					if(Resist == .5) ResistClass = 'half';
					if(Resist == 0) ResistClass = 'immune';
					
					TypeCell1.setAttribute('class', 'TypeChartCell ' + ResistClass);
					TypeCell1.innerHTML = Resist;
				
				}
				
				TypeCell2.setAttribute('class', 'TypeChartCell');
				if(PokeCalc.SelectedTypes[1] != -1)
				{
				
					Resist = TypeChart.Types[PokeCalc.SelectedTypes[1]].Resists[ThisAttackingType];
					ResistClass = 'full';
					if(Resist == 2) ResistClass = 'double';
					if(Resist == .5) ResistClass = 'half';
					if(Resist == 0) ResistClass = 'immune';
					
					TypeCell2.setAttribute('class', 'TypeChartCell ' + ResistClass);
					TypeCell2.innerHTML = Resist;
				
				}
				
				TypeCell3.setAttribute('class', 'TypeChartCell');
				
				Resist1 = 1;
				if(PokeCalc.SelectedTypes[0] != -1)
				{
					
					Resist1 = TypeChart.Types[PokeCalc.SelectedTypes[0]].Resists[ThisAttackingType];
					
				}
				
				Resist2 = 1;
				if(PokeCalc.SelectedTypes[1] != -1)
				{
					
					Resist2 = TypeChart.Types[PokeCalc.SelectedTypes[1]].Resists[ThisAttackingType];
					
				}
				
				if(!(PokeCalc.SelectedTypes[0] == -1 && PokeCalc.SelectedTypes[1] == -1))
				{
				
					CompositeResist = Resist1 * Resist2;
					CompositeResistClass = 'full';
					if(CompositeResist == 2) CompositeResistClass = 'double';
					if(CompositeResist == 4) CompositeResistClass = 'quad';
					if(CompositeResist == .5) CompositeResistClass = 'half';
					if(CompositeResist == .25) CompositeResistClass = 'quarter';
					if(CompositeResist == 0) CompositeResistClass = 'immune';
					
					TypeCell3.setAttribute('class', 'TypeChartCell ' + CompositeResistClass);
					TypeCell3.innerHTML = CompositeResist;
					
				}
				
				TypeComparisonRow.appendChild(TypeCell1);
				TypeComparisonRow.appendChild(TypeCell2);
				TypeComparisonRow.appendChild(TypeCell3);
				
				TypeSelectionContainer.appendChild(TypeComparisonRow);
			
			}
			
		
		}
	
	}

}