import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service'
import { SoloService } from './solo.service';
import { RequestNameService } from '../request-name/request-name.service';
import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';
import { SocketService } from '../socket.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {

  isSolo: string;
  displayRooms: boolean = false;
  displayRoom: boolean = false;
  roomId: string;
  nickname: string;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private soloService: SoloService,
              private requestNameService: RequestNameService,
              private socketService: SocketService) {

    this.isSolo = route.snapshot.data['isSolo'];

    this.nickname = this.requestNameService.getNickname();

    // Get Room Id
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
      if (!this.isSolo) {
        this.socketService.joinRoom(this.nickname, this.roomId);
      }
    });
  }

  ngOnInit() {
    this.requestNameService.nicknameChanged.subscribe(
      (nickname) => this.nickname = nickname
    );
  }

  prepareGame(difficulty) { this.gameService.prepareGame(difficulty); };
  startGame() { this.gameService.startGame(); };
  resumeGame() { this.gameService.resumeGame(); };
  pauseGame() { this.gameService.pauseGame(); };
  changeDifficulty(difficulty) { this.gameService.changeDifficulty(difficulty); };
  gameOver(status) { this.gameService.gameOver(status); };
  showGameoverModal(status) { this.gameService.showGameoverModal(status); };

  changeViewToNone() {
    this.displayRooms = false;
    this.displayRoom = false;
  }

  changeViewToRoomList() {
    this.displayRooms = true;
    this.displayRoom = false;
  }

  changeViewToRoom(room) {
    this.soloService.room = room;
    this.displayRooms = false;
    this.displayRoom = true;
  }
}