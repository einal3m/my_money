class ImportedTransaction < Transaction

	attr_accessor :import, :duplicate

	@import = false
	@duplicate = false
	
end
