import { Component, OnInit } from '@angular/core';
import { searching } from '../../models/search'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { ItemType, ItemTypeMapping } from '../../models/enum'
import { PageEvent } from '@angular/material/paginator'
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-general-search',
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss']
})
export class GeneralSearchComponent implements OnInit {
    gSearch:searching[]
    env:any
    itemType:ItemType
    public ItemTypeMapping = ItemTypeMapping
    totalCount
    pageNumber = 1
    pageSize = 6
    searchKeyWord
    pageEvent:PageEvent
    pageSizeOptions:number[] = [6, 9, 12, 15]



  constructor(public _ActivatedRoute:ActivatedRoute, private authService: AuthService ) { 

    this.searchKeyWord = this._ActivatedRoute.snapshot.params['searchText']
    this.env = environment
  }

  ngOnInit(): void {
    this.getAllSearchResults(this.pageSize, this.pageNumber, this.searchKeyWord)
  }  
  
  handleOnPageChange(pageEvent: PageEvent){
    this.getAllSearchResults(pageEvent.pageSize, pageEvent.pageIndex +1, this.searchKeyWord)
  }

  getAllSearchResults(pageSize, pageNumber, searchKeyWord) {
    this.authService.getAllSearchData(pageSize, pageNumber, searchKeyWord).subscribe((result:any)=>{
      if(result.isSucceeded)
      {
        this.gSearch = result.data
        console.log(this.gSearch)
      }
      
    })
  }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
