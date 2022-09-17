import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Subject } from "rxjs";
import { searchCriteria } from "../models";


@Injectable()
export class GiphyService {
    onNewResult = new Subject<string[]>()

    constructor(private http: HttpClient) { }

    search(criteria: searchCriteria): Promise<string[]> {
        const url = 'https://api.giphy.com/v1/gifs/search'
        // const key = 'w76cCZGumSNr63JHHMn0eyGtlYnOmGLB'
        // const headers = new HttpHeaders({'api-key': key})

        // construct the query params
        const params = new HttpParams()
            .set('api_key', criteria.apiKey)
            .set('q',criteria.search)
            .set('rating',criteria.rating)
            .set('limit', criteria.results)

        return firstValueFrom(
            this.http.get<any>(url, {params})
                .pipe(
                    map(result => {
                        const data = result.data
                        return data.map((v:any) => v.images.downsized_still.url as string)
                    })
                )
        )
    }
    
}