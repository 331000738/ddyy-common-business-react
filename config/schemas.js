/**
 * schemas
 * @outdated
 * 应用中需要特别指明的对象规格，主要是部分无法在其他地方定义规格的内嵌query对象，超到文档和验证的作用
 * 注：勿过度使用schema，如，rest请求的输入/输出body切勿声明，由数据库控制即可。
 */
import SimpleSchema from 'simpl-schema'

// 自定义错误
SimpleSchema.defineValidationErrorTransform(error => {
  // console.log({ error })
  const customError = new Error('对象验证错误：' + error.message)
  customError.errorList = error.details
  return customError
})

// baseQueryParams内嵌对象userInfo规格
export const userInfoSchema = new SimpleSchema({
  app_id       : {
    type     : SimpleSchema.Integer,
    // min      : 100, // test
    label    : 'pageProps.query.userInfo.app_id',
    required : true,
  },
  hos_id       : SimpleSchema.Integer,
  pat_id       : SimpleSchema.Integer,
  user_role    : {
    type          : String,
    allowedValues : ['pat', 'doc', 'dept', 'hos' , 'admin', 'hos_admin'],
  },
  pat          : Object,
  'pat.id'     : SimpleSchema.Integer,
  'pat.name'   : String,
  'pat.age'    : String,
  'pat.gender' : {
    type          : String,
    allowedValues : [ 'M', 'F', 'N']
  },
}, { requiredByDefault: false })
