({
	getResponse : function(component) {
		console.log('I m inside the helper');
        var action=component.get("c.getCalloutResponseContents");
        action.setParams({
            "url":'http://data.fixer.io/api/latest?access_key=738c44d040238a6f33970d76d41de37f'
        });
        action.setCallback(this,function(response){
            var state=response.getState();
            if(component.isValid && state==="SUCCESS")
            {
                console.log('response.getReturnValue()=> '+JSON.stringify(response.getReturnValue()));
                component.set("v.response",response.getReturnValue());
                var getAllRates=component.get("v.response")['rates'];
                console.log('getAllRates=>  '+JSON.stringify(getAllRates));
                var CurrencyList=[];
                for(var key in getAllRates)
                {
                    CurrencyList.push(key+'='+getAllRates[key]); //INR=70
                }
                component.set("v.ListOfCurrency",CurrencyList);
                console.log('CurrencyList=> '+CurrencyList);
            }
        });
             $A.enqueueAction(action);              
	},
})