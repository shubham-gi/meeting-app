class Solution {
public:
    // vector<vector<int>>dp;
    vector<int>num;
    vector<vector<int>>dp;
    int maxScore(vector<vector<int>>& grid) {
        
        num=vector<int>(101,0);
        return solve(grid,0);
    }
    int solve(vector<vector<int>>& grid,int ind){
        if(ind==grid.size()) return 0;
        int maxi=INT_MIN;
        for(int i=0;i<grid[ind].size();++i){
            if(num[grid[ind][i]]==0){
            // cout<<grid[ind][i]<<" ";
                num[grid[ind][i]]=1;
                maxi=max(maxi,grid[ind][i]+solve(grid,ind+1));
                num[grid[ind][i]]=0;
            }
        }
        maxi=max(maxi,solve(grid,ind+1));
        // cout<<maxi<<endl;
        return maxi;
    }
    
};