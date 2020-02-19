var products = [];
var productId = 1;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

setmode="add";			//either "add" or "edit"

aAddProduct.onclick=function() { setmode="add";	ProductFormPanel(null); }
						    

function addProducttoArray()
{
	var objProduct = new Object();
	
	objProduct.Id = getProductId();
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	
    products.push(objProduct);
	addProducttoDOM(objProduct);
    
    deleteProductFormPanel();
}

function addProducttoDOM(objProduct)
{  	
	//create a new DIV for this product 
	var divProduct = document.createElement("div"); divProduct.setAttribute("id", objProduct.Id);
	
	var pcol, prow, ptab, header;
    ptab = document.createElement('TABLE');

    ptab.setAttribute("border",1);

    	prow = ptab.insertRow(0); prow.setAttribute("id","row-"+objProduct.Id);
    		pcol = prow.insertCell(0); pcol.innerHTML = objProduct.Name;
    		pcol = prow.insertCell(1); pcol.innerHTML = objProduct.Desc;
    		pcol = prow.insertCell(2); pcol.innerHTML = objProduct.Price;
    		pcol = prow.insertCell(3); pcol.innerHTML = objProduct.Quantity;
		    		var aEdit = document.createElement("input");
		    			aEdit.setAttribute("type","button");
		    			aEdit.setAttribute("value","Edit"); 
		    			aEdit.setAttribute("id","ebtn-"+objProduct.Id); 
		    			aEdit.onclick = function() { editProduct(objProduct.Id); }
		    pcol = prow.insertCell(4); pcol.appendChild(aEdit);


					var aDelete = document.createElement("input");
		    			aDelete.setAttribute("type","button");
		    			aDelete.setAttribute("value","Delete"); 
		    			aDelete.setAttribute("id","dbtn-"+objProduct.Id); 
		    			aDelete.onclick = function() { deleteProduct(objProduct.Id); }
			pcol = prow.insertCell(5); pcol.appendChild(aDelete);
		    pcol = prow.insertCell(6); pcol.innerHTML = objProduct.Id;

    divProduct.appendChild(ptab);	
    //document.getElementById("addtable").appendChild(ptab);


	divListProducts.appendChild(divProduct);
	
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
}

function editProduct(prodId)
{
	alert("Editing-"+prodId);
	setmode="edit";
	ProductFormPanel(prodId);
	

}

function deleteProduct(prodId)
{
	alert("Deleting-"+prodId);  //alert(event.target); alert(event.target.parentNode); alert(event.target.parentNode.parentNode);
	
	var idx = getProductIndex(prodId); 
	products.splice(idx,1); 			console.log(products);
	

	/*//To delete by Row
	var tablerowid = document.getElementById("row-"+prodId);
	var tableid = tablerowid.parentNode;
	tableid.removeChild(tablerowid);*/

	//To delete by div
	var divid = document.getElementById(prodId);
	divListProducts.removeChild(divid);

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
