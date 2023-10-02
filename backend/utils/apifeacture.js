class ApiFeacture{
  constructor(query,querystr)
  {
      this.query= query;
      this.querystr= querystr;
  }

  search(){
    // console.log('asas',this.querystr.keyword)
      const keyword = this.querystr.keyword ? {
          name:{
              $regex:this.querystr.keyword,
              $options:'i'
          },
      } : {};
      // console.log(keyword)
      // this.query=this.query.find({...keyword});
      if (this.querystr.keyword) {
        this.query = this.query.where('category').equals(this.querystr.keyword);
      }
  
      return this;
  }

filter(){
  const querycopy = {...this.querystr}
  // remove item
  const removefield = [ "page" , "limit"];

  removefield.forEach(key => {
      delete querycopy[key]
  });
  let querystr = JSON.stringify(querycopy);
  querystr= querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
  // console.log(querycopy)
  this.query = this.query.find(JSON.parse(querystr));
  // console.log(querystr)
  return this;
}
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
export default ApiFeacture