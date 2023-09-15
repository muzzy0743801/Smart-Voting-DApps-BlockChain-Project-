document.addEventListener('DOMContentLoaded', async () => {
            if (typeof web3 !== 'undefined') {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                } catch (error) {
                    console.error(error);
                    alert("Please grant account access to continue.");
                    return;
                }

                const contractAddress = '0xA9F312B3701D8DEfC0cbEd0461AC16325702862F'; 
                const contractABI = [
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_candidate",
                                "type": "address"
                            }
                        ],
                        "name": "addCandidate",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "bytes32",
                                "name": "_proposal",
                                "type": "bytes32"
                            }
                        ],
                        "name": "addProposal",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_voter",
                                "type": "address"
                            }
                        ],
                        "name": "addVoter",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_candidate",
                                "type": "address"
                            }
                        ],
                        "name": "removeCandidate",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_voter",
                                "type": "address"
                            }
                        ],
                        "name": "removeVoter",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "_name",
                                "type": "string"
                            }
                        ],
                        "name": "setVoterName",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "bytes32",
                                "name": "_proposal",
                                "type": "bytes32"
                            }
                        ],
                        "name": "vote",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "voter",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "internalType": "bytes32",
                                "name": "proposal",
                                "type": "bytes32"
                            }
                        ],
                        "name": "Voted",
                        "type": "event"
                    },
                    {
                        "inputs": [],
                        "name": "admin",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "candidates",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "bytes32",
                                "name": "_candidate",
                                "type": "bytes32"
                            }
                        ],
                        "name": "getCandidateVoteCount",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_index",
                                "type": "uint256"
                            }
                        ],
                        "name": "getProposalAtIndex",
                        "outputs": [
                            {
                                "internalType": "bytes32",
                                "name": "",
                                "type": "bytes32"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "getProposalCount",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_voter",
                                "type": "address"
                            }
                        ],
                        "name": "getVoterName",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_voter",
                                "type": "address"
                            }
                        ],
                        "name": "getVoterVotes",
                        "outputs": [
                            {
                                "internalType": "bytes32[]",
                                "name": "",
                                "type": "bytes32[]"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "hasVoted",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "proposalCount",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "proposals",
                        "outputs": [
                            {
                                "internalType": "bytes32",
                                "name": "",
                                "type": "bytes32"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "bytes32",
                                "name": "",
                                "type": "bytes32"
                            }
                        ],
                        "name": "voteCounts",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "voterNames",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "name": "voters",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "voterVotes",
                        "outputs": [
                            {
                                "internalType": "bytes32",
                                "name": "",
                                "type": "bytes32"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ];

                const votingDApp = new web3.eth.Contract(contractABI, contractAddress);
                const adminAddress = '0xeA5970168Ed9D078f1CC3021710542ea10401806'; 
                const voterAddress = '0x0BB990745F8cD72c9e65b6fb6C4c9c6e0B29E460'; 

                const showMessage = (message, isError = false) => {
                    const statusDiv = document.querySelector('.status');
                    statusDiv.innerHTML = `<p class="${isError ? 'error-message' : 'success-message'}">${message}</p>`;
                };

                document.getElementById('setVoterNameBtn').addEventListener('click', async () => {
                    const voterName = prompt("Enter your name:");
                    if (!voterName) {
                        showMessage('Please enter a valid name.', true);
                        return;
                    }

                    try {
                        await votingDApp.methods.setVoterName(voterName).send({ from: voterAddress });
                        showMessage('Your name has been set!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error setting voter name', true);
                    }
                });

                document.getElementById('addVoterBtn').addEventListener('click', async () => {
                    const voterAddressToAdd = prompt("Enter the Ethereum address of the voter:");
                    if (!web3.utils.isAddress(voterAddressToAdd)) {
                        showMessage('Invalid Ethereum address', true);
                        return;
                    }
                
                    try {
                        await votingDApp.methods.addVoter(voterAddressToAdd).send({ from: adminAddress });
                        showMessage('Voter successfully added!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error adding voter', true);
                    }
                });        

                document.getElementById('removeVoterBtn').addEventListener('click', async () => {
                    const voterAddressToRemove = prompt("Enter the Ethereum address of the voter to remove:");
                    if (!web3.utils.isAddress(voterAddressToRemove)) {
                        showMessage('Invalid Ethereum address', true);
                        return;
                    }

                    try {
                        await votingDApp.methods.removeVoter(voterAddressToRemove).send({ from: adminAddress });
                        showMessage('Voter successfully removed!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error removing voter', true);
                    }
                });

                document.getElementById('addCandidateBtn').addEventListener('click', async () => {
                    const candidateAddress = prompt("Enter candidate Ethereum address:");
                    if (!web3.utils.isAddress(candidateAddress)) {
                        showMessage('Invalid Ethereum address', true);
                        return;
                    }

                    try {
                        await votingDApp.methods.addCandidate(candidateAddress).send({ from: adminAddress });
                        showMessage('Candidate successfully added!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error adding candidate', true);
                    }
                });

                document.getElementById('voteBtn').addEventListener('click', async () => {
                    const proposal = document.getElementById('proposalInput').value;
                    if (proposal.trim() === "") {
                        showMessage("Please enter a valid proposal.", true);
                        return;
                    }

                    try {
                        const bytes32Proposal = web3.utils.utf8ToHex(proposal);
                        await votingDApp.methods.vote(bytes32Proposal).send({ from: voterAddress });
                        showMessage('Vote successfully cast!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error casting vote', true);
                    }
                });

                document.getElementById('addProposalBtn').addEventListener('click', async () => {
                    const proposalText = prompt("Enter proposal text:");
                    if (!proposalText) {
                        showMessage('Please enter a valid proposal text.', true);
                        return;
                    }

                    try {
                        const bytes32Proposal = web3.utils.utf8ToHex(proposalText);
                        await votingDApp.methods.addProposal(bytes32Proposal).send({ from: adminAddress });
                        showMessage('Proposal successfully added!', false);
                    } catch (error) {
                        console.error(error);
                        showMessage('Error adding proposal', true);
                    }
                });

                const proposalCount = await votingDApp.methods.getProposalCount().call();
                const voterVotes = await votingDApp.methods.getVoterVotes(voterAddress).call();

                const proposalListDiv = document.querySelector('.proposal-list');
                proposalListDiv.innerHTML = '';
                for (let i = 0; i < proposalCount; i++) {
                    const proposal = await votingDApp.methods.getProposalAtIndex(i).call();
                    const voteCount = await votingDApp.methods.voteCounts(proposal).call();
                    const proposalElement = document.createElement('div');
                    proposalElement.innerHTML = `Proposal: ${web3.utils.hexToUtf8(proposal)} | Votes: ${voteCount}`;
                    proposalListDiv.appendChild(proposalElement);
                }

                const voterVotesDiv = document.querySelector('.voter-votes');
                voterVotesDiv.innerHTML = `Your votes: ${voterVotes.map(vote => web3.utils.hexToUtf8(vote)).join(', ')}`;
            } else {
                alert("Please install MetaMask or use a web3-enabled browser.");
                return;
            }
 });
