var products = [];
var productId = 1;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

var kart=[];
var kartId=1;

setmode="add";			//either "add" or "edit"

aAddProduct.onclick=function() { setmode="add";	ProductFormPanel(null); }
						    
//loadproducts(); 
//loadkart();


function loadproducts()
{ 

		var x=JSON.parse(localStorage.getItem("products"));//to print the local storage data
		
		var objProduct = new Object();
		
		if(x.length>0)				//x!=null not working
		{
			for(var i=0;i<x.length;i++)
			{
				products.push(x[i]);//pushing array in the json object etc....
			   
				
				objProduct.Id = products[i].Id;
				objProduct.Name = products[i].Name;
				objProduct.Desc = products[i].Desc;
				objProduct.Price = products[i].Price;
				objProduct.Quantity = products[i].Quantity;

				//addProducttoDOM(objProduct);
			}
			productId=objProduct.Id+1;			//Since initial Product Id is 1 we need to update it
		}
		
		addProductstoDOM();
}

function loadkart()
{
		var k=JSON.parse(localStorage.getItem("kart"));//to print the local storage data
		
			if(k.length>0)
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
				
			}
			kartId=i+1;			//if cart already contains items then kartId cannont be 1
			
			var aViewKart = document.getElementById("aViewKart");
			if (k.length>0) aViewKart.innerHTML="View Cart("+k.length+")";
}

function updateproducts()
{
	localStorage.setItem("products",JSON.stringify(products));
	addProductstoDOM();
}

function addProducttoArray()
{
	var objProduct = new Object();
	
	objProduct.Id = getProductId();
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	if(objProduct.Name.length==0 || objProduct.Desc.length==0 || objProduct.Price.length==0 || objProduct.Quantity.length==0 )
	{
		alert("No data");
		return;
	}
    products.push(objProduct);
	alert("Saved - "+objProduct.Id);
	
	updateproducts();
	
	//addProducttoDOM(objProduct);
    
    deleteProductFormPanel();
}

function addProductstoDOM()
{  	
	//create a new DIV for this product 
	
	divListProducts.innerHTML="";
	
	var pcol, prow, ptab, rowhead;
    ptab = document.createElement('TABLE');

    ptab.setAttribute("border","1px");
	ptab.setAttribute("width","600px");
	ptab.setAttribute("height","100px");
	ptab.setAttribute("align","center");
	
	rowhead = ptab.insertRow(0); rowhead.setAttribute("id","row-heading"); rowhead.setAttribute("style","background:cyan");
	pcol = rowhead.insertCell(0); pcol.innerHTML = "Product Name"
	pcol = rowhead.insertCell(1); pcol.innerHTML = "Description"
	pcol = rowhead.insertCell(2); pcol.innerHTML = "Quantity";
	pcol = rowhead.insertCell(3); pcol.innerHTML = "Price";
	pcol = rowhead.insertCell(4); pcol.colSpan=3; pcol.innerHTML = "Select operation";
	
	for(var i=0; i<products.length; i++)
		{
			var objProduct = new Object();
			var divProduct = document.createElement("div"); divProduct.setAttribute("id", objProduct.Id);
			
			objProduct.Id = products[i].Id;
			objProduct.Name = products[i].Name;
			objProduct.Desc = products[i].Desc;
			objProduct.Price = products[i].Price;
			objProduct.Quantity = products[i].Quantity;
			
			prow = ptab.insertRow(i+1); prow.setAttribute("id","row-"+objProduct.Id);
    		pcol = prow.insertCell(0); pcol.innerHTML = objProduct.Name;
    		pcol = prow.insertCell(1); pcol.innerHTML = objProduct.Desc;
    		pcol = prow.insertCell(2); pcol.innerHTML = objProduct.Price;
    		pcol = prow.insertCell(3); pcol.innerHTML = objProduct.Quantity;
			
				var aEdit = document.createElement("input");
					aEdit.setAttribute("type","button");
					aEdit.setAttribute("value","Edit"); 
					aEdit.setAttribute("id","ebtn-"+objProduct.Id); 
					aEdit.onclick = function() { editProduct(this.id); }
		    pcol = prow.insertCell(4); pcol.appendChild(aEdit);

				var aDelete = document.createElement("input");
					aDelete.setAttribute("type","button");
					aDelete.setAttribute("value","Delete"); 
					aDelete.setAttribute("id","dbtn-"+objProduct.Id); 
					aDelete.onclick = function() { deleteProduct(this.id); }
			pcol = prow.insertCell(5); pcol.appendChild(aDelete);
		    //pcol = prow.insertCell(6); pcol.innerHTML = objProduct.Id;

				var aAddcart = document.createElement("input");
					aAddcart.setAttribute("type","button");
					aAddcart.setAttribute("value","Add to cart - "+objProduct.Id);
					aAddcart.setAttribute("id","dbtn-"+objProduct.Id);
					aAddcart.onclick = function() { addTokart(this.id,1); }

			pcol = prow.insertCell(6); pcol.appendChild(aAddcart);

			//divProduct.appendChild(ptab);	
			//document.getElementById("addtable").appendChild(ptab);

			//divListProducts.appendChild(divProduct);
			
		}
		
	divListProducts.appendChild(ptab);
	
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
}

function editProduct(prodId)
{
	prodId = prodId.substring(prodId.indexOf("-")+1);
	alert("Editing-"+prodId);
	setmode="edit";
	ProductFormPanel(prodId);
	

}

function deleteProduct(prodId)
{
	prodId = prodId.substring(prodId.indexOf("-")+1);
	
	alert("Deleting-"+prodId);  //alert(event.target); alert(event.target.parentNode); alert(event.target.parentNode.parentNode);
	
	var idx = getProductIndex(prodId); 
	products.splice(idx,1); 			console.log(products);
	

	//To delete by Row
	var tablerow = document.getElementById("row-"+prodId);
	tablerow.parentElement.removeChild(tablerow); 
	
	
	//var tableid = tablerowid.parentNode;
	//tableid.removeChild(tablerowid);

	//To delete by div
	//var divid = document.getElementById(prodId);
	//divListProducts.removeChild(divid);
	
	//Remove the Product from the cart if added
		var r=false;
		for(var kidx = 0; kidx<kart.length; kidx++)
		{
			if(kart[kidx].PID==prodId)
			{
				r = confirm("Product exists in cart! Continuing will delete from cart too. Are you sure ?");
				if(r==true)
				{
					kart.splice(kidx,1);
					iteminkart=1;
				}
			}
		}	
		
		if(r==true)
		{
			localStorage.setItem("kart",JSON.stringify(kart));		//store cart in localStorage
			alert("Products and Cart Updated");
		}
		
	updateproducts();
}

function ProductFormPanel(prodId)
{
	
	aAddProduct.setAttribute("style","visibility:hidden");		//hide to add products startup link
	
	var objProduct = new Object(); 
	var idx; 

	if(setmode=="edit") 
		{ 
			idx = getProductIndex(prodId); 
			objProduct=getProductDetails(idx);
		}


	/* Label - Product Quantity */ 
	var lblAddProduct = document.createElement("label");
	if(setmode=="edit") txt="Edit Product"; else txt="Add Product";
	lblAddProduct.innerHTML = txt;
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	if(setmode=="edit") txtProductName.setAttribute("value",objProduct.Name);
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	if(setmode=="edit") txtProductDesc.innerHTML=objProduct.Desc;	//.setAttribute("value",objProduct.Desc); doesnt work
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	if(setmode=="edit") txtProductPrice.setAttribute("value",objProduct.Price);
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	if(setmode=="edit") txtProductQuantity.setAttribute("value",objProduct.Quantity);
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnButton = document.createElement("button");
	btnButton.setAttribute("id","btnButton");
	if(setmode=="edit") txt="Update Product"; else txt="Add Product";
	btnButton.innerHTML = txt;

	if(setmode=="edit")
		btnButton.onclick = function() 
			{ 
				products[idx].Name = document.getElementById("txtProductName").value;
    			products[idx].Desc = document.getElementById("txtProductDesc").value;
				products[idx].Price = document.getElementById("txtProductPrice").value;
				products[idx].Quantity = document.getElementById("txtProductQuantity").value;

				//To update table html Row
				var tablerowid = document.getElementById("row-"+prodId);
				var objProduct=new Object();
				objProduct=getProductDetails(idx);		//retrieve updated object details from the array
				tablerowid.childNodes[0].innerHTML=objProduct.Name;
				tablerowid.childNodes[1].innerHTML=objProduct.Desc;
				tablerowid.childNodes[2].innerHTML=objProduct.Price;
				tablerowid.childNodes[3].innerHTML=objProduct.Quantity;
				
		    	tablerowid.childNodes[6].innerHTML = "Edited: "+objProduct.Id;
		    	alert("Product details updated !");
		    	deleteProductFormPanel();
				updateproducts();
		    	unHideAddNewProductLink()
			}
	else
		btnButton.onclick = function() { addProducttoArray(); }

	
	divAddProduct.appendChild(btnButton);		
		
}




/***************************************
	Miscelaneous functions set 1
***************************************/

function getProductId()
{
	return productId++;
}	

// Given a product ID, returns the index to the product data in products. 
function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
			return i;
    }
} 

function getProductDetails(selectedProductIndex)
{
	var objProduct=new Object();
	objProduct.Id=selectedProductIndex;
	objProduct.Name=products[selectedProductIndex].Name;
	objProduct.Desc=products[selectedProductIndex].Desc;
	objProduct.Price=products[selectedProductIndex].Price;
	objProduct.Quantity=products[selectedProductIndex].Quantity;

  	console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);	

  	return objProduct;
}

/***************************************
	Miscelaneous functions set 2
***************************************/

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}


function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}


function deleteProductFormPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}


/*****************************
	kart functions
******************************/

function getKartId()
{
	return kartId++;
}

function addTokart(PID,QTY)
{
	PID = PID.substring(PID.indexOf("-")+1);
	
	alert("Adding PID - " + PID);
	var objKart=new Object();
	
	var exist_idx = getKartIndex(PID);
	alert(PID+", "+exist_idx);
	
	if(exist_idx>=0)
	{
		++kart[exist_idx].QTY; 
	}
	else
	{
		objKart.KID=getKartId();
		objKart.PID=PID;
		objKart.QTY=QTY;
		kart.push(objKart);
	}
	
	updatekart();
	//loadkart();			//reloads the updated kart from localStorage and updates the div too
}

function updatekart()
{
	localStorage.setItem("kart",JSON.stringify(kart));
	
	//var aViewKart = document.getElementById("aViewKart");
	//if (kart.length>0) aViewKart.innerHTML="View Cart("+kart.length+")";
}

function getKartIndex(PID) 
{
    for (var i = 0; i < kart.length; i++) 
	{
        if (kart[i].PID == PID) 
			return i;
    }
	return -1;
} 

function getKartDetails(selectedKartIndex)
{
	var objKart=new Object();
	
	objKart.KID=selectedKartIndex;
	objKart.PID=kart[selectedKartIndex].PID;
	objKart.QTY=kart[selectedKartIndex].QTY;
	
  	console.log( "Kart ID : " + kart[selectedKartIndex].KID + "  Product ID: " + kart[selectedKartIndex].KID + 
               "  Quantity: " + kart[selectedKartIndex].QTY);	

  	return objKart;
}
