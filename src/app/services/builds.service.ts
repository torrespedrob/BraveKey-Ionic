import { Injectable } from '@angular/core';
import { Build } from '../model/build';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class BuildsService {

  builds: Build[] = [];
  buildCounter: number = 0;

  constructor() {
    this.getBuildsFromStorage().then(
      data => this.builds = data
    );

    this.getBuildCounterFromStorage().then(
      data => this.buildCounter = data
    );
  }

  public getBuilds(): Build[] {
    return this.builds;
  }

  public async getBuildsFromStorage(): Promise<Build[]> {
    const ret = await Storage.get({ key: 'builds' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  public async getBuildCounterFromStorage(): Promise<number> {
    const { value } = await Storage.get({ key: 'buildCounter' });
    return value ? +value : 0;
  }

  public getBuild(id: number) {
    return { ...this.builds.filter(b => b.id === id)[0] };
  }

  public async saveBuild(b: Build) {

    if (b.id == undefined) { // tarea nueva
      b.id = this.buildCounter++;
      this.builds.push(b);
    } else { // edición de una tarea existente
      this.builds = this.builds.filter(ba => ba.id != b.id);
      this.builds.push(b);
    }

    await this.saveBuilds(this.builds);
    await this.saveBuildCounter(this.buildCounter);
  }

  public async saveBuilds(builds: Build[]) {
    await Storage.set({
      key: 'builds',
      value: JSON.stringify(builds)
    });
  }

  public async saveBuildCounter(bc: number) {
    await Storage.set({
      key: 'buildCounter',
      value: '' + bc
    });
  }

  public async deleteBuild(id: number) {
    this.builds = this.builds.filter(b => b.id != id);
    await this.saveBuilds(this.builds);
  }
}