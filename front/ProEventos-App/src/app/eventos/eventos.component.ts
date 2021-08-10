import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IEventos } from 'src/models/interface/IEventos.models';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: IEventos[] = [];
  public eventosFilter: IEventos[] = [];
  public widthImg: number = 150;
  public marginImg: number = 2;
  public collapsedImg: boolean = false;
  private _filterList: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get<IEventos[]>('http://localhost:5000/api/eventos')
      .subscribe(
        resp => { this.eventos = resp; this.eventosFilter = resp; },
        err => console.log(err)
      );
  }

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(filter: string) {
    this._filterList = filter;
    this.eventosFilter = this.filterList ? this.filterEvent(this._filterList.toLocaleLowerCase()) : this.eventos;
  }

  private filterEvent(filterBy: string): IEventos[] {
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filterBy.toLowerCase()) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterBy.toLowerCase()) !== -1)
  }
}
