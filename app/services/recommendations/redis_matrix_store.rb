class Recommendations::RedisMatrixStore
  def initialize(prefix)
    @prefix = prefix
    @redis = $redis
  end

  def save(matrix)
    @redis.pipelined do
      matrix.each do |subject_id, preferences|
        preferences.each do |object_id, score|
          store_single_value(subject_id, object_id, score)
        end
      end
    end
  end

  def load
    keys = @redis.keys("#{@prefix}*") 

    rows = @redis.pipelined do
      keys.map { |key| @redis.hgetall(key) }
    end

    keys.each.with_index.inject({}) do |matrix, (key, index)|
      match_data = key.match(Regexp.new("#{@prefix}_\(\\d+\)"))
      if match_data
        matrix[match_data[1]] = rows[index].each do |k, v|
          rows[index][k] = v.to_i
        end
      end
      matrix
    end
  end

  def store_single_value(subject_id, object_id, score)
    @redis.hset "#{@prefix}_#{subject_id}", object_id, score
  end
end
