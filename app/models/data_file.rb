STMTTRN = "<STMTTRN>"
END_STMTTRN = "</STMTTRN>"
TRNTYPE = "<TRNTYPE>"
DTPOSTED = "<DTPOSTED>"
TRNAMT = "<TRNAMT>"
FITID = "<FITID>"
MEMO = "<MEMO>"

class DataFile 

  # function to upload file, parse it and return a hash with contents
  def self.parseOFX(uploadedFile)
  p "I am here parseOFX"
  
  ofxArray = uploadedFile.read.split(/\r\n/)
  
  txnArray = Array.new
  
  ofxArray.each_with_index do |ofx, i|
  
  	# look for the start of the transaction...
  	if (ofx == STMTTRN) then
  	
  		#... then search the entries following for the rest
  		txn_i = i + 1
  		while (ofxArray[txn_i] != END_STMTTRN) do
  		
  			if (ofxArray[txn_i][0..8] == TRNTYPE) then
  				txnType = ofxArray[txn_i].reverse[0..-10].reverse
  			elsif (ofxArray[txn_i][0..9] == DTPOSTED) then
  				txnDate = Date.iso8601(ofxArray[txn_i].reverse[0..-11].reverse)
  			elsif (ofxArray[txn_i][0..7] == TRNAMT) then
  				txnAmount = ofxArray[txn_i].reverse[0..-9].reverse.to_f
  			elsif (ofxArray[txn_i][0..6] == FITID) then
  				txnId = ofxArray[txn_i].reverse[0..-8].reverse
  			elsif (ofxArray[txn_i][0..5] == MEMO) then
  				txnMemo = ofxArray[txn_i].reverse[0..-7].reverse
  			end
  			txn_i += 1
  		end

		# add all txn info onto the txnArray variable
		txnArray = txnArray.push(ImportedTransaction.new(transaction_type: txnType, date: txnDate, amount: txnAmount, fitid: txnId, memo: txnMemo))

  	  end
	end
  	p txnArray
    return txnArray
  end
  
end
