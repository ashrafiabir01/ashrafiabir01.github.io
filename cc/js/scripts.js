!function(t){function l(t,l,n){return"random"===t&&(t=Math.floor(12*Math.random())+1)<10&&(t="0"+t),"random"===l&&(l=Math.floor(6*Math.random())+2022),""===n&&(n=Math.floor(989*Math.random())+10)<100&&(n="0"+n),"|"+t+"|"+l+"|"+n}t(".result").click(function(){t(this).val().length>0&&(t(this).select(),document.execCommand("copy"),0==t(".msg").length?t(".msg-blank").replaceWith('<div class="msg">Copied to clipbroad!</div>'):(t(".msg").replaceWith('<div class="msg-blank"></div>'),setTimeout(function(){t(".msg-blank").replaceWith('<div class="msg">Copied to clipbroad!</div>')},100)))}),t(".result").change(function(){null!=t(".msg")&&t(".msg").replaceWith('<div class="msg-blank"></div>')}),t(".bin").on("focusout",function(){let l=t(this).val();l.length>5&&t(this).val(l+"xxxxxxxxxxxxxxxx".substring(l.length-1,15))}),t(".gen-btn").click(function(){let n=t(".bin").val().replaceAll("x","").toString(),a=t(".month").val(),e=t(".year").val(),i=t(".cvv").val(),o=t(".quantity").val();t(".format").val();if(t(".result").html(""),n.length>5)for(let s=1;s<=o;s++){let r=n+Math.random().toString().substr(2,16-n.length)+l(a,e,i);s<o?t(".result").append(r+"\n"):t(".result").append(r)}})}(jQuery);