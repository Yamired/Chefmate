import { Injectable } from '@angular/core';
import { Collections, GroupRecord, GroupResponse, RecordIdString, SpecRecord, SpecResponse } from '@shared/utils/types/types';
import PocketBase, { ListResult, RecordModel } from 'pocketbase';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {

    private _pb: PocketBase;

    constructor() {
        this._pb = new PocketBase(environment.pocketbaseURL);
    }

    // Read
    async listIngredients(page: number, itemsCount: number, search: string | undefined): Promise<ListResult<RecordModel>> {
        const searchPredicate: string = search !== undefined ? `Name ~ '${search}'` : '';
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Ingredient).getList(page, itemsCount, { filter: searchPredicate })
                .then((response: ListResult<RecordModel>) => {
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }
    async getIngredientGroupsAndSpecs(id: RecordIdString): Promise<any> {
        const searchPredicate: string = `Ingredient ~ '${id}'`;
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Ingredient).getFullList<GroupResponse<{Specs: SpecResponse[]}>>({ filter: searchPredicate })
                .then((response: any) => {
                    console.log(response)
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }


    // Create
    async createIngredient(data: any): Promise<RecordModel> {
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Ingredient).create(data)
                .then((response: RecordModel) => {
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }
    async createGroup(data: GroupRecord): Promise<RecordModel> {
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Group).create(data)
                .then((response: RecordModel) => {
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }
    async createSpec(data: SpecRecord): Promise<RecordModel> {
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Spec).create(data)
                .then((response: RecordModel) => {
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }


    // Delete
    async deleteIngredient(id: RecordIdString): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._pb.collection(Collections.Ingredient).delete(id)
                .then((response: boolean) => {
                    resolve(response);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }


    // Utils
    getFileURL(record: RecordModel, file: string): string {
        return this._pb.files.getUrl(record, file, {'thumb': '80x80'});
    }

}
