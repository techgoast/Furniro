let cartBody=document.getElementById("cart-body");let subTotal=document.getElementById("sub-total");let total=document.getElementById("total");let cartData=[];window.addEventListener("load",()=>{setTimeout(async()=>{let res=await fetch("./assets/apis/cart.json");let data=await res.json();cartData=[...data.orders];cartUI(cartData);totalUI(cartData)},0)});function cartUI(data){for(let i=0;i<data.length;i++){cartBody.innerHTML+=`
      <tr>
        <td>
          <div class="image">
            <img
              src="${data[i].image}"
              alt="product${i}"
            />
          </div>
          <span>${data[i].product}</span>
        </td>
        <td>$ ${data[i].price}</td>
        <td>
          <input type="number" id="quantity${i}" name="quantity${i}" value="${
            data[i].quantity
          }" aria-label="quantity${i}" min=1 />
        </td>
        <td id="total-price${i}">$ ${(
      data[i].quantity * data[i].price
    ).toLocaleString()}</td>
        <td class="delete-item"><i class="fa-solid fa-trash"></i></td>
      </tr>
    `}
assignEvents(cartData)}
function totalUI(data){let totalAmount=data.reduce((acc,item)=>{return acc+item.quantity*item.price},0);subTotal.innerHTML+=`$ ${totalAmount.toLocaleString()}`;total.innerHTML+=`$ ${totalAmount.toLocaleString()}`}
function assignEvents(data){let inputs=document.querySelectorAll("td input");let deleteBtns=document.querySelectorAll("td.delete-item");inputs.forEach((input,i)=>{input.addEventListener("change",(e)=>{if(e.target.value<1){e.target.value=1}
handleChange(i,data,e.target.value)})});deleteBtns.forEach((Btn,i)=>{Btn.addEventListener("click",()=>{handleDelete(i,data)})})}
function handleChange(i,data,n){data=data.map((item,j)=>{return j===i?{...item,quantity:n}:item});cartData=[...data];cartBody.innerHTML="";subTotal.innerHTML="";total.innerHTML="";cartUI(cartData);totalUI(cartData)}
function handleDelete(i,data){data=data.filter((item,j)=>{return j!==i});cartData=[...data];cartBody.innerHTML="";subTotal.innerHTML="";total.innerHTML="";cartUI(cartData);totalUI(cartData)}