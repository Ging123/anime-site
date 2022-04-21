interface Cache {
  create:(key:string, value:any, time:string|number) => Promise<any>;
  get:(key:string) => Promise<any>;
  delete:(key:string) => Promise<any>;
}

export default Cache;