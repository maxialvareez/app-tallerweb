import { Component, OnInit,Input } from '@angular/core';
import { IGrupo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab-lists',
  templateUrl: './tab-lists.component.html',
  styleUrls: ['./tab-lists.component.css']
})
export class TabListsComponent implements OnInit {

  @Input() grupo!: IGrupo;

  constructor() { }

  ngOnInit(): void {
  }

}
