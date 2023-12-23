$(".my-dropdown-button").click(function(){
    /*
    ===== dropdown menu
        <a class="my-dropdown-button"  dropdown-menu-name="#profile" ></a>
        <div id="profile"></div>
    */
    let menu_id = $(this).attr("dropdown-menu-name");
    $(menu_id).toggleClass('d-none')
})

// $(".sidebar>ul>li").each(function(e){
//     console.log(this)
//     let is_active = $(this).find('.active')
//     console.log(is_active.length)
//     if(is_active.length>0){
//         $(this).addClass('active')
//         $(this).find('.wrap-child').removeClass("d-none")
//     }
// })
