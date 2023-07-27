import type { CSVRowProps } from '@/types/features/import/ImportType';
import Papa from 'papaparse';
import { transform } from 'lodash';

//Parse Csv to data function
 // @ts-ignore
export const modelingCsv = async (file: File, { rejectWithValue })=>{
    return new Promise ((resolve, reject) => {
        Papa.parse<CSVRowProps>(file,{
            header:true,
            complete: async(results, file)=>{
                if(results){
                    const transformedData = transform(results.data, (result, row) => {
                        const transformedRow = Object.fromEntries(
                        Object.entries(row).map(([key, value]) => [key.toLowerCase(), typeof value === 'string' ? value.toLowerCase() : value])
                        );
                         // @ts-ignore
                        result.push(transformedRow);
                            }, []);


                        resolve(transformedData)

                }
                else {
                console.log('results:', results)
                reject('error')

                }
            }
        })
    })

}