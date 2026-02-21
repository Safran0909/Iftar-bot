import java.util.Scanner;
public class sec{
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("enter no: "     );
        int n=s.nextInt();
        int [] arr = new int[n];
        for (int i=0;i<n;i++){
            arr[i] = s.nextInt();
        }
        int largest = arr[0];
        int smallest = arr[0];
        for (int i=0;i<n;i++){
            if (arr[i] > largest){
                largest = arr[i];
            }
            if (arr[i] < smallest){
                smallest = arr[i];
            }
        }
        System.out.println("largest " + largest);
        System.out.println("smallest " + smallest);

        s.close();
    }
}