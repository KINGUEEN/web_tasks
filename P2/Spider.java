import java.io.*;
import java.net.*;
import java.util.Scanner;
import java.util.regex.*;

public class Spider {
	static String sendURL(String Url) {               //定义一个sendURL类  实现人工赋值url的功能
		URLConnection connection = null;
		BufferedReader read = null;
		String result = "";
		try {
			URL url = new URL(Url);        //new一个url
			connection = url.openConnection();    //开始连接
			read = new BufferedReader(new InputStreamReader(connection.getInputStream()));//定义一个读操作
			String buff = null;
			while ((buff = read.readLine()) != null) {  //将读到的字符串保存在result数组中
				result += buff;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				read.close();		//关闭写数据流
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	static void Judge(String patternstr, String matchstr) throws IOException {  //定义一个具有判断功能的类
		Pattern pattern = Pattern.compile(patternstr);   // 将正则表达式赋给pattern
		PrintWriter write = null;                            
		write = new PrintWriter(new FileWriter("e:/title.txt"), true);       //定义写操作
		Matcher match = pattern.matcher(matchstr);        //将要匹配的字符串赋给match
		while (match.find()) {
			write.println(match.group());          //如果找到  ，则将匹配的字符串写入e：/title.txt文件中
		}
		write.close();          //关闭写数据流
	}

	public static void main(String[] args) throws IOException {
		Scanner input=new Scanner(System.in);
		System.out.println("请输入网址");
		String url=null;           //定义url
		url=input.nextLine();
		String result = sendURL(url);                        //获取从url指定网站中爬到的字符串
		Judge("src=\"(.+?)\"", result);       //判断并写入字符串
		input.close();
	}
}
