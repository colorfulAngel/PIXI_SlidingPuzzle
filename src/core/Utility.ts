
export class Utility{
    public static getInvArr = (arr) => {
        let val = 0;
        let vm = Utility.mergeSort(arr, 0, arr.length-1, val);
        return vm;
    }
    public static mergeSort = (arr, l, r, val) => {
        if(l >= r) return 0;
        
        let m = Math.floor((l+r)/2);
        let v1 = Utility.mergeSort(arr, l, m, val);
        let v2 = Utility.mergeSort(arr, m+1, r, val);
        let v3 = Utility.merge(arr, l, m, r);
          
          val += v1 + v2 + v3;
          return val;
    }
    public static merge = (arr, l, m, r) => {
          let vm = 0;
      
        let left = arr.slice(l, m+1);
        let right = arr.slice(m+1, r+1);
        
        let n1 = left.length;
        let n2 = right.length;
        let i = 0, j = 0, k = l;
        
        while(i < n1 && j < n2){
            if(left[i] <= right[j]){
                arr[k] = left[i];
                i++;
            }
            else{
                arr[k] = right[j];
                j++;
                  vm += (n1-i);
            }
            k++;
        }
        
        while(i < n1){
            arr[k] = left[i];
            i++;
            k++;
        }
        
        while(j < n2){
            arr[k] = right[j];
            j++;
            k++;
        }
        
        return vm;
    }
}