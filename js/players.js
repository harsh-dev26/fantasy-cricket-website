// Define the players data
const players = [
    // KKR Players
    { name: "Ajinkya Rahane", team: "KKR", role: "Batsman", captain: true, fantasyPoints: 0, totalMatches: "185", runs: "4642", wickets: "1", average: "30.14", strikeRate: "123.43", economy: "N/A" },
    { name: "Sunil Narine", team: "KKR", role: "All-Rounder", fantasyPoints: 0, totalMatches: "150", runs: "1200", wickets: "180", average: "22.40", strikeRate: "145.8", economy: "6.70" },
    { name: "Quinton de Kock", team: "KKR", role: "Wicketkeeper", fantasyPoints: 0, totalMatches: "110", runs: "3200", wickets: "0", average: "38.50", strikeRate: "135.6", economy: "N/A" },
    { name: "Venkatesh Iyer", team: "KKR", role: "All-Rounder", fantasyPoints: 0, totalMatches: "45", runs: "1050", wickets: "20", average: "31.50", strikeRate: "140.2", economy: "8.40" },
    { name: "Angkrish Raghuvanshi", team: "KKR", role: "Batsman", fantasyPoints: 0, totalMatches: "20", runs: "450", wickets: "0", average: "28.10", strikeRate: "125.6", economy: "N/A" },
    { name: "Rinku Singh", team: "KKR", role: "Batsman", fantasyPoints: 0, totalMatches: "40", runs: "950", wickets: "0", average: "32.75", strikeRate: "150.8", economy: "N/A" },
    { name: "Andre Russell", team: "KKR", role: "All-Rounder", fantasyPoints: 0, totalMatches: "125", runs: "2400", wickets: "110", average: "30.20", strikeRate: "175.2", economy: "9.10" },
    { name: "Ramandeep Singh", team: "KKR", role: "Batsman", fantasyPoints: 0, totalMatches: "25", runs: "380", wickets: "0", average: "25.30", strikeRate: "132.6", economy: "N/A" },
    { name: "Spencer Johnson", team: "KKR", role: "Bowler", fantasyPoints: 0, totalMatches: "30", runs: "120", wickets: "45", average: "15.80", strikeRate: "110.5", economy: "7.80" },
    { name: "Vaibhav Arora", team: "KKR", role: "Bowler", fantasyPoints: 0, totalMatches: "28", runs: "80", wickets: "35", average: "20.40", strikeRate: "90.2", economy: "8.20" },
    { name: "Harshit Rana", team: "KKR", role: "Bowler", fantasyPoints: 0, totalMatches: "32", runs: "100", wickets: "40", average: "22.10", strikeRate: "95.8", economy: "7.60" },
    { name: "Varun Chakravarthy", team: "KKR", role: "Bowler", fantasyPoints: 0, totalMatches: "65", runs: "150", wickets: "85", average: "18.50", strikeRate: "105.2", economy: "6.90" },

    // RCB Players
    { name: "Rajat Patidar", team: "RCB", role: "Batsman", captain: true, fantasyPoints: 0, totalMatches: "38", runs: "980", wickets: "0", average: "34.20", strikeRate: "142.5", economy: "N/A" },
    { name: "Phil Salt", team: "RCB", role: "Wicketkeeper", fantasyPoints: 0, totalMatches: "55", runs: "1650", wickets: "0", average: "36.70", strikeRate: "155.8", economy: "N/A" },
    { name: "Virat Kohli", team: "RCB", role: "Batsman", fantasyPoints: 0, totalMatches: "230", runs: "7500", wickets: "4", average: "42.30", strikeRate: "138.5", economy: "9.20" },
    { name: "Devdutt Padikkal", team: "RCB", role: "Batsman", fantasyPoints: 0, totalMatches: "50", runs: "1450", wickets: "0", average: "32.20", strikeRate: "135.8", economy: "N/A" },
    { name: "Liam Livingstone", team: "RCB", role: "All-Rounder", fantasyPoints: 0, totalMatches: "70", runs: "1800", wickets: "35", average: "31.50", strikeRate: "160.2", economy: "8.70" },
    { name: "Jitesh Sharma", team: "RCB", role: "Wicketkeeper", fantasyPoints: 0, totalMatches: "32", runs: "780", wickets: "0", average: "29.80", strikeRate: "145.6", economy: "N/A" },
    { name: "Tim David", team: "RCB", role: "All-Rounder", fantasyPoints: 0, totalMatches: "48", runs: "1100", wickets: "15", average: "30.20", strikeRate: "165.3", economy: "9.40" },
    { name: "Krunal Pandya", team: "RCB", role: "All-Rounder", fantasyPoints: 0, totalMatches: "120", runs: "1600", wickets: "80", average: "25.40", strikeRate: "138.5", economy: "7.60" },
    { name: "Bhuvneshwar Kumar", team: "RCB", role: "Bowler", fantasyPoints: 0, totalMatches: "150", runs: "250", wickets: "170", average: "12.80", strikeRate: "90.2", economy: "7.20" },
    { name: "Josh Hazlewood", team: "RCB", role: "Bowler", fantasyPoints: 0, totalMatches: "60", runs: "120", wickets: "85", average: "18.50", strikeRate: "85.6", economy: "7.50" },
    { name: "Yash Dayal", team: "RCB", role: "Bowler", fantasyPoints: 0, totalMatches: "30", runs: "80", wickets: "42", average: "20.10", strikeRate: "80.2", economy: "8.30" },
    { name: "Suyash Sharma", team: "RCB", role: "Bowler", fantasyPoints: 0, totalMatches: "25", runs: "50", wickets: "35", average: "18.80", strikeRate: "68.5", economy: "7.90" }
];