"use strict";angular.module("n",["ngAnimate","ngResource","ngRoute","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("n").controller("MainCtrl",["$scope","$http","NewsFactory",function(a,b,c){a.toggleSelectSource=function(){a.selectSource=!a.selectSource},a.sources=[{name:"Público",url:"http://feeds.feedburner.com/PublicoRSS"},{name:"iOnline",url:"http://feeds.feedburner.com/jornali"},{name:"Expresso",url:"http://expresso.sapo.pt/static/rss/atualidade--arquivo_23412.xml"},{name:"Observador",url:"http://observador.pt/feed/"},{name:"Abola",url:"http://rss.feedsportal.com/c/32502/f/480420/index.rss"}],a.weather={},a.main={},a.wind={},b.get("http://api.openweathermap.org/data/2.5/weather?q=berlin,de&lang=pt").success(function(b){a.weather=b.weather[0],a.main=b.main}).error(function(){alert("No weather information.")}),a.currentSource=a.sources[0],a.selectSource=!1,a.fetchSource=function(b){c.parseFeed(b.url).then(function(c){a.news=c.data.responseData.feed.entries,a.currentSource=b,a.selectSource=!1})}}]).directive("silent",function(){return{restrict:"A",link:function(a,b,c){(c.ngClick||""===c.href||"#"===c.href)&&b.on("click",function(a){a.preventDefault()})}}}).filter("trim",function(){return function(a){return String(a).replace(/<[^>]+>/gm,"")}}).filter("temp",function(){return function(a){return Math.round(a-273.15)}}).filter("speed",function(){return function(a){return Math.round(3.6*a)}}).factory("NewsFactory",["$http",function(a){return{parseFeed:function(b){return a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent(b))}}}]);