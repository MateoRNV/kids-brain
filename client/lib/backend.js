class BackendService {
    constructor ( $axios, name ) {
      this.$axios = $axios;
      this.name = '/'+name
    }
  
    _itemPath(id){
      return `${this.name}/${id}`;
    }
  
    async _req( method, url, data ){
      if(method==="get"){
          data={
            params: data
          };
      }
      const config = {};
      if( method !== 'get' || method !== 'delete' ){
        if(typeof FormData !== 'undefined' && data instanceof FormData ){
          config.headers = { 'Content-Type': 'multipart/form-data' };
        }
      }
      return this.$axios[method]( url, data, config )
      .then(function({ status, data }){
        if( status > 199 && status < 300 ){
          return data;
        }
        return Promise.reject(new Error( res.data.error || 'Api request failed', res.status ) );
      });
    }
  
    find( data ){
      return this._req( 'get', this.name, data );
    }
  
    create( data ){
      return this._req( 'post', this.name, data );
    }
  
    delete( id ){
      return this._req( 'delete', this._itemPath(id) );
    }
  
    get( id ){
      return this._req( 'get', this._itemPath(id) );
    }
  
    put( id, data ){
      return this._req( 'put', this._itemPath(id), data );
    }
  
    patch( id, data ){
      return this._req( 'patch', this._itemPath(id), data );
    }

    getAll(){
      return this._req( 'get', this.name);
    }
}

const serviceCache = {};

export default function ServiceFactory( $axios, serviceName ){
  if( serviceCache[ serviceName ] === undefined ){
    serviceCache[ serviceName ] = new BackendService( $axios, serviceName );
  }
  return serviceCache[ serviceName ];
}