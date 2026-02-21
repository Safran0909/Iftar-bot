import java.util.Scanner;
public class fourth{
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("enter no: "     );
        int n=s.nextInt();
        int [] arr = new int[n];
        for (int i=0;i<n;i++){
            arr[i] = s.nextInt();
        }
        int largest=arr[0];
        int c=0;
        for (int i=0;i<n;i++){
            if (c==2){
                System.out.println("third : " + largest);
                break;
            }
            if (arr[i]>largest){
                largest = arr[i];
                c++;
            }
        }
        s.close();
    }
}