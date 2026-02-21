import java.util.Scanner;
public class third{
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("enter no: "     );
        int n=s.nextInt();
        int [] arr = new int[n];
        for (int i=0;i<n;i++){
            arr[i] = s.nextInt();
        }
        for (int i=0;i<n;i++){
            if (arr[i]%2==0){
                System.out.print(arr[i]);
            }
        }
        System.out.println(" ");
        for (int i=0;i<n;i++){
            if (arr[i]%2!=0){
                System.out.print(arr[i]);
            }
        }
        s.close();
    }
}