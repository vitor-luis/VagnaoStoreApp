import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  vendaId: number = null

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.vendaId = this._activatedRoute.snapshot.params['id']
    console.log(this.vendaId)
  }

}
