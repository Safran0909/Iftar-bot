import java.util.Scanner;
public class test{
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("enter no: "     );
        int n=s.nextInt();
        int sum=0;
        int [] arr = new int[n];
        for (int i=0;i<n;i++){
            arr[i] = s.nextInt();
        }
        for (int i=0;i<n;i++){
            sum=sum+arr[i];
        }
        System.out.println(sum);
        s.close();
    }
}