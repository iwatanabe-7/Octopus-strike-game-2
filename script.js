enchant();

window.onload = function () {
	const game = new Game(400, 500);

	var ASSETS = {
		//-------- 効果音  --------//
		'button_bgm' : "bgm/button.mp3",
		'takoyaki_click_bgm' : "bgm/striking.mp3",
		'battle_bgm' : "bgm/battle.mp3",
		'start_bgm' : "bgm/start.mp3",

	    //-------- 画像 --------//
		'start_img' : "img/start.png",
		'shop_img'  : "img/shop.png",
		'takoyaki_img' : "img/takoyaki.png",
		'yes_img' : "img/yes.png",
		'no_img' : "img/no.png",
		'exit_img' : "img/exit.png",
		'retry_img' : "img/retry.png",
		'tweet_img' : "img/tweet.png",
		'bg_outside_img' : "img/bg-outside.png",
	}

	game.preload(ASSETS);

	game.onload = function () {
		let point = 0;
		let state;

		//-------- Start画面  --------//
		const startScene = new Scene();
		game.pushScene(startScene);
		var bg = new Sprite(400,500);
		bg.image = game.assets['bg_outside_img'];
		startScene.addChild(bg);

		startScene.addEventListener(Event.ENTER_FRAME, function(){
			game.assets['start_bgm'].play();
		});

		// // 円を表示するSpriteを作成する
		// var square = new Sprite(50, 50);
		// var surface = new Surface(50, 50);
		// surface.context.strokeStyle = "red";
		// surface.context.strokeRect (0, 0, 100, 100);
		// square.image = surface;
		// startScene.addChild(square);

		//-------- titleラベル  --------//
		const startText = new Label("Octopus strike game 2");
		startText.font = "37px fantasy";
		startText.color = 'red';
		startText.width = 400;
		startText.moveTo(40, 180);
		startScene.addChild(startText);

		//startボタン
		const startbutton = new Sprite(176, 60);
		startbutton.moveTo(120, 280);
		startbutton.image = game.assets['start_img'];
		startScene.addChild(startbutton);

		startbutton.ontouchend = function () {
			state = 0.1;
			game.assets['button_bgm'].clone().play();
			game.replaceScene(mainScene);
		};

		//shopボタン
		const shopbutton = new Sprite(176, 60);
		shopbutton.moveTo(120, 360);
		shopbutton.image = game.assets['shop_img'];
		startScene.addChild(shopbutton); 
		


		//-------- Game画面 --------//
		const mainScene = new Scene();
		var bg = new Sprite(400,500);
		bg.image = game.assets['bg_outside_img'];
		mainScene.addChild(bg);

		mainScene.addEventListener(Event.ENTER_FRAME, function(){
			game.assets['start_bgm'].pause();
		});

		//ポイント表示テキスト
		const scoreText = new Label();
		scoreText.font = "20px fantasy";
		scoreText.color = 'black';
		scoreText.width = 400;
		scoreText.moveTo(0, 30);
		mainScene.addChild(scoreText);
		scoreText.text = "現在：" + point;

		//レベル表示テキスト
		const levelText = new Label();
		levelText.font = "20px fantasy";
		levelText.color = 'black';
		levelText.width = 400;
		levelText.moveTo(0, 60);
		mainScene.addChild(levelText);
		levelText.text = "レベル：" + state;

		const takoyakiImg = new Sprite(100, 100);
		takoyakiImg.moveTo(118, 100);
		takoyakiImg.image = game.assets['takoyaki_img'];
		mainScene.addChild(takoyakiImg);

		//-------- タッチアクション  --------//
		takoyakiImg.ontouchend = function () {
			point++;
			game.assets['takoyaki_click_bgm'].clone().play();
			this.y = -200;

			if (point < 1) {
				state = 1;
			} else if (point < 2) {
				state = 2;
			} else if (point < 3) {
				state = 3;
			} else if (point < 4) {
				state = 4;
			} else {
				state = 5;
			}

		};

		game.onenterframe = function () {
			//初期値(start画面)
			if (state == 0) {
				takoyakiImg.x = 150;
				takoyakiImg.y = -200;
				point = 0;
				state = 0;
			}
			//初期値(main画面)
			if (state == 0.1) {
				takoyakiImg.x = 150;
				takoyakiImg.y = -200;
				point = 0;
				state = 1;
			}
			if (state == 1) {
				takoyakiImg.y += 10;
			}
			if (state == 2) {
				takoyakiImg.y += 15;
			}
			if (state == 3) {
				takoyakiImg.x = 200 + Math.tan(takoyakiImg.x / 70) * 10;
				takoyakiImg.y += 10;
				
			}
			if (state == 4) {	
				takoyakiImg.x = Math.random() * 300;
				state = 4.1;
			}
			if (state == 4.1) {
				takoyakiImg.y += 10;
			}
			if (state == 5) {
				takoyakiImg.x = Math.random() * 300;
				state = 5.1
			}
			if (state == 5.1){
				takoyakiImg.y += 10 + Math.random() * 30;
			}

			//現在のテキスト表示
			scoreText.text = "Point：" + point;
			levelText.text = "レベル" + parseInt(state, 10);

			//ゲームオーバー判定
			if (takoyakiImg.y >= 500) {
				game.replaceScene(endScene);
				//ゲームオーバー後のテキスト表示
				if(state >= 5){
					gameOverText.text = "Clear";
					gameOverText.moveTo(150, 160);
					gameOverText.color = 'green';
					continueText.text = "";

					retryBtn.remove();
					tweetBtn.moveTo(120, 340);
					tweetBtn.image = game.assets['exit_img'];
					endScene.addChild(tweetBtn);
					
				}else{
					gameOverText.text = "GAMEOVER";
					gameOverText.moveTo(100, 160);
					gameOverText.color = 'red';
					continueText.text = "Continue?";

					retryBtn.moveTo(30, 340);
					retryBtn.image = game.assets['yes_img'];
					endScene.addChild(retryBtn);
					
					tweetBtn.moveTo(210, 340);
					tweetBtn.image = game.assets['no_img'];
					endScene.addChild(tweetBtn);
				}
				gameOverText2.text = "撃破：" + point + "個";
			}

		};

		//-------- GAMEOVER画面  --------//
		const endScene = new Scene();
		endScene.backgroundColor = "black";

		//GAMEOVER
		const gameOverText = new Label();
		gameOverText.font = "50px fantasy";
		gameOverText.width = 400;
		endScene.addChild(gameOverText);
	
		const gameOverText2 = new Label();
		gameOverText2.font = "37px fantasy";
		gameOverText2.width = 400;
		gameOverText2.color = 'white';
		gameOverText2.moveTo(130, 220);
		endScene.addChild(gameOverText2);

		const continueText = new Label();
		continueText.font = "37px fantasy";
		continueText.width = 400;
		continueText.color = 'Green';
		continueText.moveTo(130, 280);
		endScene.addChild(continueText);

		//リトライボタン
		const retryBtn = new Sprite(176, 60);

		retryBtn.ontouchend = function () {
			state = 0.1;
			game.assets['button_bgm'].clone().play();
			game.replaceScene(mainScene);
		};

		const tweetBtn = new Sprite(176, 60);

		tweetBtn.ontouchend = function () {
			state = 0;
			game.assets['button_bgm'].clone().play();
			game.replaceScene(startScene);
		};

	};
	game.start();
};