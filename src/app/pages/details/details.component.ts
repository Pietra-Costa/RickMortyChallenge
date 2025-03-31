import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickmortyapiService } from '../../services/rickmortyapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  characterId: string = '';
  character = null as any;

  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortySvc: RickmortyapiService
  ) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.rickAndMortySvc.getCharactersById(this.characterId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.character = res;
      },
      error: (error) => {},
    });
  }
}
