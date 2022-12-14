enchant();

window.onload = function () {
	const game = new Game(400, 500);

	//-------- 効果音  --------//
	const clickSndUrl = "img/click.wav";
	game.preload([clickSndUrl]);

	//-------- 画像 --------//
	const takoyakiImgUrl = "img/takoyaki.png";
	game.preload([takoyakiImgUrl]);

	const retryImgUrl = "img/retry.png";
	game.preload([retryImgUrl]);

	const tweetImgUrl = "img/tweet.png";
	game.preload([tweetImgUrl]);

	const backgroundURL = "img/bg-outside.png";
	game.preload([backgroundURL]);


	game.onload = function () {
		let point = 0;
		let state;

		//-------- Start画面  --------//
		const startScene = new Scene();
		game.pushScene(startScene);
		var bg = new Sprite(400,500);
		bg.image = game.assets[backgroundURL];
		startScene.addChild(bg);

		const startText = new Label("start");
		startText.font = "20px Meiryo";
		startText.color = 'rgba(255,255,255,1)';
		startText.width = 400;
		startText.moveTo(0, 30);
		startScene.addChild(startText);

		//startボタン
		const startBtn = new Sprite(120, 60);
		startBtn.moveTo(100, 300);
		startBtn.image = game.assets[retryImgUrl];
		startScene.addChild(startBtn); 

		startBtn.ontouchend = function () {
			state = 0;
			game.replaceScene(mainScene);
		};
		
		//Main画面の設定
		const mainScene = new Scene();
		var bg = new Sprite(400,500);
		bg.image = game.assets[backgroundURL];
		mainScene.addChild(bg);

		//ポイント表示テキスト
		const scoreText = new Label();
		scoreText.font = "20px Meiryo";
		scoreText.color = 'rgba(255,255,255,1)';
		scoreText.width = 400;
		scoreText.moveTo(0, 30);
		mainScene.addChild(scoreText);

		scoreText.text = "現在：" + point;

		const takoyakiImg = new Sprite(100, 100);
		takoyakiImg.moveTo(118, 100);
		takoyakiImg.image = game.assets[takoyakiImgUrl];
		mainScene.addChild(takoyakiImg);

		//-------- タッチアクション  --------//
		takoyakiImg.ontouchend = function () {
			point++;
			game.assets[clickSndUrl].clone().play();
			this.y = -200;

			if (point < 1) {
				state = 1;
			} else if (point < 2) {
				state = 2;
			} else if (point < 3) {
				state = 3;
			} else if (point < 10) {
				state = 4;
			} else {
				state = 5;
			}

		};

		game.onenterframe = function () {
			if (state == 0) {
				takoyakiImg.x = 150;
				takoyakiImg.y = -200;
				point = 0;
				state = 1;
			}
			if (state == 1) {
				takoyakiImg.y += 5;
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
				takoyakiImg.y += 15 + Math.random() * 30;
			}

			//現在のテキスト表示
			scoreText.text = "Point：" + point + " " + "レベル" + parseInt(state, 10);

			//ゲームオーバー判定
			if (takoyakiImg.y >= 500) {
				game.replaceScene(endScene);
				//ゲームオーバー後のテキスト表示
				gameOverText.text = "GAMEOVER 記録：" + point + "枚";				//テキストに文字表示 
			}

		};

		//結果画面
		const endScene = new Scene();
		endScene.backgroundColor = "black";

		//GAMEOVER
		const gameOverText = new Label();
		gameOverText.font = "20px Meiryo";
		gameOverText.color = 'rgba(255,255,255,1)';
		gameOverText.width = 400;
		gameOverText.moveTo(0, 30);
		endScene.addChild(gameOverText);



		//リトライボタン
		const retryBtn = new Sprite(120, 60);
		retryBtn.moveTo(50, 300);
		retryBtn.image = game.assets[retryImgUrl];
		endScene.addChild(retryBtn); 

		retryBtn.ontouchend = function () {
			state = 0;
			game.replaceScene(mainScene);
		};

		//ツイートボタン
		const tweetBtn = new Sprite(120, 60);
		tweetBtn.moveTo(230, 300);
		tweetBtn.image = game.assets[tweetImgUrl];
		endScene.addChild(tweetBtn);

		tweetBtn.ontouchend = function () {
			state = 0;
			game.replaceScene(startScene);
		};

	};
	game.start();
};