/*
 jQuery Instagram Plugin by TT
 
 Version: 1.0
  Author: TeslaThemes
 Website: http://teslathemes.com/
 */

themeInstagram=function(){function a(a,t){var e,n,i,r,s;s="https://api.instagram.com/v1",e=function(t){var e,n,i,r;if(t.length){for(r="",n=0,i=t.length;i>n;n++)e=t[n],r+="<li class='text-center'><a href='"+e.link+"' title='"+e.title+"' target='_blank'><img src='"+e.image+"' alt='"+e.title+"' width='150' height='150'></a></li>";return a.append(r)}},a.data("instagram-username")&&(s+="/users/search?q="+a.data("instagram-username")+"&client_id="+t.clientID+"&callback=?",n=this._template,r=(new Date).getTime(),localStorage.getItem("instagramFeed")&&(i=JSON.parse(localStorage.getItem("instagramFeed")),r=(new Date).getTime()-i.timestamp,99999>r&&e(i.data)),r>99999&&(localStorage.removeItem("instagramFeed"),$.ajax({dataType:"jsonp",url:s,data:t,success:function(a){var i;return a.data.length?(i="https://api.instagram.com/v1/users/"+a.data[0].id+"/media/recent/?client_id="+t.clientID+"&count="+t.count+"&callback=?",$.ajax({dataType:"jsonp",url:i,data:t,success:function(a){var t;return a.data.length?(t={},t.data=n(a),t.timestamp=(new Date).getTime(),localStorage.setItem("instagramFeed",JSON.stringify(t)),e(t.data)):void 0}})):void 0}})))}return a.prototype._template=function(a){var t,e,n,i,r;if(a.data){for(i=a.data,r=[],e=0,n=i.length;n>e;e++)t=i[e],r.push({title:t.user.username,link:t.link,image:t.images.thumbnail.url});return r}},a}(),$("[data-instagram]").length&&(iContainer=$("[data-instagram]"),teslaInstagram=new themeInstagram(iContainer,{clientID:"632fb01c8c0d43d7b63da809d0b6a662",count:iContainer.data("instagram")||6}));