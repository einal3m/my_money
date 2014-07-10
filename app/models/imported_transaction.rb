class ImportedTransaction < Transaction

	attr_accessor :import, :duplicate

	@import = true
	@duplicate = false
	
end
