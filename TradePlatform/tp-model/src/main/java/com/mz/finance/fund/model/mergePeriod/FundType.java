
/**
 * Copyright:  北京互融时代软件有限公司
 * @author:    Gao Mimi
 * @version:   V1.0 
 * @Date:      2015年11月17日  16:57:27
 */
package  com.mz.finance.fund.model.mergePeriod;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)//修饰属性的
@Retention(RetentionPolicy.RUNTIME) 
public @interface FundType {
	public enum priorLevel{
		
		None(0),//None表示不对账的记录  比如本金放款记录  本金放款台账，不是很清楚，暂作保留吧
		One(1),Two(2),Three(3),Four(4),Five(5),Six(6),Seven(7),eight(8),nine(9);//一个项目一期 有6中款项类型，撑死了吧
		private Integer level ;
		private priorLevel(Integer level){
			this.level = level;
		}
		public Integer getLevel(){
			return this.level;
		}
	}
	public String name();
	public priorLevel prior() default priorLevel.One;
}
