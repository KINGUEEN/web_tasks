package test.data;

import java.util.*;
import java.math.*;
import java.io.*;
import java.math.BigInteger;

public class Fibonacci {
	public static void main(String[] args) {
		BigInteger fib[] = new BigInteger[100]; // 使用BigInteger定义数组
		fib[0] = fib[1] = BigInteger.ONE; // 初始化数组值为1
		System.out.println("请输入n的值");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		{
			for (int i = 2; i < n; i++) {
				fib[i] = fib[i - 1].add(fib[i - 2]);
			}
		}
		for (int j = 0; j < n; j++) {
			System.out.println(fib[j]); // 循环输出数组的值
		}
	}
}
