(function(){
	
	var Memory = {

		// создание карточки
		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// доступ к классам
			this.cardsArray = $.merge(cards, cards);
			// перемешивание карточек
			this.shuffleCards(this.cardsArray);
			// раскладывание
			this.setup();
		},

		
		shuffleCards: function(cardsArray){
			// встроенный метод .shuffle
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			// доступ к картам
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		
		binding: function(){
			// нажатие на карточку
			this.$memoryCards.on("click", this.cardClicked);
		},

		// если нажали на карточку
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			// если карточка уже не перевёрнута и мы не нажимаем на ту же самую карточку второй раз подряд
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				// переворачиваем её
				$card.find(".inside").addClass("picked");
				// если мы перевернули первую карточку
				if(!_.guess){
					// запоминаем
					_.guess = $(this).attr("data-id");
				// если мы перевернули вторую и она совпадает с первой
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					// оставляем обе на поле перевёрнутыми
					$(".picked").addClass("matched");
					// обнуляем первую карточку
					_.guess = null;
						// если вторая не совпадает с первой
						} else {
							// обнуляем первую карточку
							_.guess = null;
							_.paused = true;
							// переворот
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// если мы перевернули все карточки
				if($(".matched").length == $(".card").length){
					setTimeout(() => { window.location.href = "play1_2.html" }, 2000);
				}
			}
		},



		// перезапуск игры
		reset: function(){
			// перемешивание карточек
			this.shuffleCards(this.cardsArray);
			// раскладывание
			this.setup();
			this.$game.show("slow");
		},

		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		// добавление карточек на страницу
		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="img/shirt.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};
		// карточки
	var cards = [
		{	
			// название
			name: "justify-content",
			// адрес картинки
			img: "img/map3.png",
			// порядковый номер пары
			id: 7
		},
		{
			name: "justify-content",
			img: "img/map4.png",
			id: 8
		},
		{
			name: "justify-content",
			img: "img/map5.png",
			id: 9
		},
		{
			name: "justify-content",
			img: "img/map11.png",
			id: 10
		}, 
		{
			name: "пример кода",
			img: "img/map9.png",
			id: 11
		},
		{
			name: "justify-content",
			img: "img/map25.png",
			id: 12
		}, 
	];
    
    
	// запускаем игру
	Memory.init(cards);


})();