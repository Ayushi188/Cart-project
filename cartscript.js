var kproducts = [];
var kart=[];

//emptycart(); alert("Cart Cleared"); 

function viewcart()
{
	
	var divListKart = document.getElementById("divListKart");
	alert(kart.length);

	
	var divProduct2 = document.createElement("div");
	

	var tabl, col, rowhead, rowrec, header2;
	tabl = document.createElement('TABLE');

	tabl.setAttribute("border","1px");
	tabl.setAttribute("height","150px");
	tabl.setAttribute("width","400px");
	
	rowhead = tabl.insertRow(0); rowhead.setAttribute("id","row-heading");
	col = rowhead.insertCell(0); col.innerHTML = "Product Name"
	col = rowhead.insertCell(1); col.innerHTML = "Quantity";
	col = rowhead.insertCell(2); col.innerHTML = "Price";

	for(var i=0;i<kart.length;i++)
			{
				var objKart = new Object();
				objKart.KID = kart[i].KID;
				objKart.PID = kart[i].PID;
				objKart.QTY = kart[i].QTY;

				var objProduct=new Object()
				var pidx= getProductIndex(objKart.PID);		//get product array index & product details of the prod in kart
				objProduct = getProductDetails(pidx);
				   
				divProduct2.setAttribute("id",objProduct.Id);
				
				rowrec= tabl.insertRow(i+1); rowrec.setAttribute("id","row-"+objProduct.Id);
				col = rowrec.insertCell(0); col.innerHTML = objProduct.Name    
				
				var selectid="sel-"+objKart.KID;
				
				var selstr = "<select id="+selectid+">";
				for(var q=1; q<=objProduct.Quantity; q++)
				{
					selstr += "<option value="+q;
						if(q==objKart.QTY) selstr+=" selected";
					selstr +=">"+q+"</option>";
				}
				selstr+="</select>";
				
				selstr+=" <a href='#' onclick='updateKartQty("+objKart.KID+", \""+ selectid + "\")'>Update</a>";
				
				
				col = rowrec.insertCell(1); col.innerHTML = selstr;
						
						
				col = rowrec.insertCell(2); col.innerHTML = objProduct.Price    

				divProduct2.appendChild(tabl);


				divListKart.appendChild(divProduct2);

				//insertBlankLine(divProduct2);
				//insertBlankLine(divProduct2);
																																							 
	}


}

function loadkart()
{
		var k=JSON.parse(localStorage.getItem("kart"));//to print the local storage data
		
			if(k!=null)
			{
				for(var i=0;i<k.length;i++)
				{
					kart.push(k[i]);//pushing array in the json object etc....
				   /*
				var objKart = new Object();
				objKart.KID = kart[i].KID;
				objKart.PID = kart[i].PID;
				objKart.QTY = kart[i].QTY;

				*/
				//addProducttoDOM(objProduct);
				}
				var aViewKart = document.getElementById("aViewKart");
				aViewKart.innerHTML="View Cart("+k.length+")";
			}
}


function getKartIndex(KID) 
{
    for (var i = 0; i < kart.length; i++) 
	{
        if (kart[i].KID == KID) 
			return i;
    }
} 
function updateKartQty(KID, SELID)
{
	var qty=document.getElementById(SELID).value;
	
	kart[getKartIndex(KID)].QTY=qty;
	
	localStorage.setItem("kart",JSON.stringify(kart));		//store cart in localStorage
	
	alert("Kart Updated ! to "+qty);
}	


function emptycart()
{
	
	localStorage.setItem("kart",null);
	loadkart();
	var aViewKart = document.getElementById("aViewKart");
	aViewKart.innerHTML="View Cart("+k.length+")";
	alert(kart.length);
}


/* PROduCT RELATED */
function loadproductsforkart()
{

	var x=JSON.parse(localStorage.getItem("products"));//to print the local storage data
    if(x!=null)
    {
        for(var i=0;i<x.length;i++)
        {
            kproducts.push(x[i]);//pushing array in the json object etc....
           
			var objProduct = new Object();
			objProduct.Id = kproducts[i].Id;
			objProduct.Name = kproducts[i].Name;
			objProduct.Desc = kproducts[i].Desc;
			objProduct.Price = kproducts[i].Price;
			objProduct.Quantity = kproducts[i].Quantity;
        }
    }
	
}


function getProductIndex(id) 
{
    for (var i = 0; i < kproducts.length; i++) 
	{
        if (kproducts[i].Id == id) 
			return i;
    }
} 


function getProductDetails(selectedProductIndex)
{
	var objProduct=new Object();
	objProduct.Id=selectedProductIndex;
	objProduct.Name=kproducts[selectedProductIndex].Name;
	objProduct.Desc=kproducts[selectedProductIndex].Desc;
	objProduct.Price=kproducts[selectedProductIndex].Price;
	objProduct.Quantity=kproducts[selectedProductIndex].Quantity;

  	console.log( "Name : " + kproducts[selectedProductIndex].Name + "  Desc: " + kproducts[selectedProductIndex].Desc + 
               "   Price : " + kproducts[selectedProductIndex].Price + "  Quantity: " + kproducts[selectedProductIndex].Quantity);	

  	return objProduct;
}

