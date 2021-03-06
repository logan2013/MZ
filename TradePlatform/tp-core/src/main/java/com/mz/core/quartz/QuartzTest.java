/**
 * @Description: 
 *
 * @Title: QuartzTest.java
 * @Package com.joyce.quartz.main
 * @Copyright: Copyright (c) 2014
 *
 * @author Comsys-LZP
 * @date 2014-6-26 下午03:35:05
 * @version V2.0
 */
package com.mz.core.quartz;


import com.mz.core.quartz.ScheduleJob;

/**
 * @Description: 测试类
 *
 * @ClassName: QuartzTest
 * @Copyright: Copyright (c) 2014
 *
 * @author Comsys-LZP
 * @date 2014-6-26 下午03:35:05
 * @version V2.0
 */
public class QuartzTest {
	public static void main(String[] args) {
		try {
			String job_name = "动态任务调度";
			System.out.println("【系统启动】开始(每1秒输出一次)...");  
			
			ScheduleJob job = new ScheduleJob();
			job.setBeanClass("com.mz.core.quartz.Demo2");
			job.setMethodName("hellogmm2");
			
			
			QuartzManager.addJob(job_name, job,QuartzJob.class, "0/1 * * * * ?");  
			
			
			ScheduleJob job1= new ScheduleJob();
			job1.setBeanClass("com.mz.core.quartz.Demo1");
			job1.setMethodName("hellogmm");
			
			
			QuartzManager.addJob(job_name+"a", job1,QuartzJob.class, "0/1 * * * * ?");
			
		//	QuartzManager.addJob(job_name, job,QuartzJob.class, "*/10 * * * * ?");  
			
//			Thread.sleep(5000);  
//			System.out.println("【修改时间】开始(每2秒输出一次)...");  
//			QuartzManager.modifyJobTime(job_name, "10/2 * * * * ?");  
//			Thread.sleep(6000);  
//			System.out.println("【移除定时】开始...");  
//			QuartzManager.removeJob(job_name);  
//			System.out.println("【移除定时】成功");  
//			
//			System.out.println("【再次添加定时任务】开始(每10秒输出一次)...");  
//			QuartzManager.addJob(job_name, QuartzJob.class, "*/10 * * * * ?");  
//			Thread.sleep(60000);  
//			System.out.println("【移除定时】开始...");  
//			QuartzManager.removeJob(job_name);  
//			System.out.println("【移除定时】成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
